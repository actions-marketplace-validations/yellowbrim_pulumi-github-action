# yellowbrim/pulumi-github-action

## Usage

Example:

```yaml
name: Pulumi
on:
  push:
    branches:
      - main
jobs:
  up:
    name: Update
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 1
      - uses: yellowbrim/pulumi-github-action@v0.2.0
        with:
					value: ${{ env.SOME_VALUE }} # REQUIRED
					yq-path: ${{ env.LODASH_PATH }} # REQUIRED
					yml-file: Pulumi.dev.yaml # DEFAULT: Pulumi.dev.yaml
        env:
          # ZZZ: ${{ secrets.YYY }}
          # PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
          # PULUMI_CI: up
```

Use in a `.github/workflows` `.yml` file:

```yaml
- name: Pulumi-Action
  uses: yellowbrim/pulumi-github-action@v0.2.0
```

## Credit

forked from amichel/pulumi-github-action, which was "forked from pulumi/action to support stack output"

## Reference

See:

https://pulumi.com/docs/reference/cd-github-actions/
