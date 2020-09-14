const core = require('@actions/core');
const github = require('@actions/github');
const yaml = require('js-yaml');
const fs = require('fs');
const { set } = require('lodash');

try {
  const yqPath = core.getInput('yq-path');
  const value = core.getInput('value');
  const encoding = core.getInput('yml-file-encoding');
  const ymlFileName = core.getInput('yml-file');

  const doc = yaml.safeLoad(fs.readFileSync(ymlFileName, encoding), {
    json: true,
    filename: ymlFileName, // Just for debugging purposes, no funcational purpose ("string to be used as a file path in error/warning messages")
  });
  console.log(`Doc got!`, doc);
  core.setOutput('originalDoc', JSON.stringify(doc));

  const updatedDoc = set(doc, yqPath, value);
  core.setOutput('updatedDoc', JSON.stringify(doc));
  console.log(`Doc updated!`, updatedDoc);

  fs.writeFileSync(yaml.safeDump(updatedDoc, {}));
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
