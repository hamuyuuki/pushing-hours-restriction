# Pushing Hours Restriction

This GitHub Action behaves like "pushing hours restriction" of the branch protection rule in the default branch.

You can restrict pushes to the default branch to pushing hours when you use this action.
For example, if you want to restrict pushes to working hours, you can set pushing hours as working hours. You can't merge(push) to the default branch outside of pushing hours in a pull request.

# Usage

You can create a `.github/workflows/pushing-hours-restriction.yml` and put this code.

```yaml
name: Pushing Hours Restriction

on:
  schedule:
    # NOTE: Execute every hour from Monday to Thursday with UTC
    - cron: '0 * * * *'

jobs:
  pushing_hours_restriction:
    runs-on: ubuntu-latest
    steps:
      - uses: hamuyuuki/pushing-hours-restriction@v0.1.0
        with:
          appId: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          privateKey: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          installationId: ${{ secrets.PUSHING_HOURS_RESTRICTION_INSTALLATION_ID }}
          startHour: 9
          endHour: 18
        env:
          TZ: Asia/Tokyo
```

## Reduce the number of executing actions

```yaml
name: Pushing Hours Restriction

on:
  schedule:
    # NOTE: Execute startHour and endHour from Monday to Thursday with UTC
    - cron: '0 0,9 * * MON-THU'

jobs:
  pushing_hours_restriction:
    runs-on: ubuntu-latest
    steps:
      - uses: hamuyuuki/pushing-hours-restriction@v0.1.0
        with:
          appId: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          privateKey: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          installationId: ${{ secrets.PUSHING_HOURS_RESTRICTION_INSTALLATION_ID }}
          startHour: 9
          endHour: 18
        env:
          TZ: Asia/Tokyo
```

# Authentication
WIP

## Using a Personal Access Token
WIP

## Using a GitHub Apps
WIP

# Limitation
- Restrict pushes to the default branch from Friday to Sunday.
- Please set `TZ` environment variable if you want to use hours with time zone.
