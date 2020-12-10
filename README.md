# Pushing Hours Restriction
This GitHub Action adds pusing hours restriction to the Branch protection rule of the default branch.

# Usage

```yaml
name: Pushing Hours Restriction

on:
  schedule:
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

# Authentication
WIP

## Using a Personal Access Token
WIP

## Using a GitHub Apps
WIP

# Limitation
- Restrict pushes to the default branch from Friday to Sunday.
- Please set `TZ` environment variable if you want to use hours with time zone.
