[![GitHub version](https://badge.fury.io/gh/hamuyuuki%2Fpushing-hours-restriction.svg)](https://badge.fury.io/gh/hamuyuuki%2Fpushing-hours-restriction)
[![CI](https://github.com/hamuyuuki/pushing-hours-restriction/actions/workflows/ci.yml/badge.svg)](https://github.com/hamuyuuki/pushing-hours-restriction/actions/workflows/ci.yml)
[![CD](https://github.com/hamuyuuki/pushing-hours-restriction/actions/workflows/cd.yml/badge.svg)](https://github.com/hamuyuuki/pushing-hours-restriction/actions/workflows/cd.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/cde9661e0a22607df12f/maintainability)](https://codeclimate.com/github/hamuyuuki/pushing-hours-restriction/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cde9661e0a22607df12f/test_coverage)](https://codeclimate.com/github/hamuyuuki/pushing-hours-restriction/test_coverage)

# Pushing Hours Restriction

This GitHub Action behaves like "pushing hours restriction" of the branch protection rule in the default branch.

You can restrict pushes to the default branch to pushing hours when you use this action.
For example, if you want to restrict pushes to working hours, you can set pushing hours as working hours. You can't merge(push) to the default branch outside of pushing hours in a pull request.

# Usage

This GitHub Action enables/disables [_Restrict who can push to matching branches_ rule of the branch protection](https://docs.github.com/en/github/administering-a-repository/about-protected-branches#restrict-who-can-push-to-matching-branches) automatically.

## 1. Create a GitHub App

You can create a new GitHub App on your organization account(e.g.: https://github.com/organizations/:organization/settings/apps/new).

When you create a GitHub App, you should select an access level to _Read & Write_ on the _Administration_ of _Repository permissions_. And you should _Only on this account_ option on the _Where can this GitHub App be installed?_.

Then you can generate a new private key on GitHub App settings.

## 2. Install the GitHub App

You can select _Install App_ menu and install your GitHub App to your organization account.

## 3. Create a branch protection

You need to create a branch protection for the default branch. You can refer to https://docs.github.com/en/github/administering-a-repository/managing-a-branch-protection-rule#creating-a-branch-protection-rule.

## 4. Create a workflow

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
      - uses: hamuyuuki/pushing-hours-restriction@v0.7.0
        with:
          app_id: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          private_key: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          start_hour: 9
          end_hour: 18
```

If you want reduce the number of executing actions, you can put this code.

```yaml
name: Pushing Hours Restriction

on:
  schedule:
    # NOTE: Execute start_hour and end_hour from Monday to Thursday with UTC
    - cron: '0 9,18 * * MON-THU'

jobs:
  pushing_hours_restriction:
    runs-on: ubuntu-latest
    steps:
      - uses: hamuyuuki/pushing-hours-restriction@v0.7.0
        with:
          app_id: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          private_key: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          start_hour: 9
          end_hour: 18
```

# Inputs

## app_id

If you authenticate with a GitHub App, you should set this input. You can set **App Id** of your GitHub App.

## private_key

If you authenticate with a GitHub App, you should set this input. You can set **Private key** of your GitHub App.

## weekdays

This input is optional. You can set a comma delimited short weekday name (e.g. `'MON,TUE'`). When you set a value to weekdays, you can enable pushing hours on that weekdays. The default value is `'MON,TUE,WED,THU'`.

## start_hour

This input is required. You can set a start of pushing hours.

## end_hour

This input is required. You can set an end of pushing hours.

## timeZone

This input is optional. You can set an IANA time zone name (e.g. `'Asia/Tokyo'`). When you set a value to timeZone, you can enable pushing hours with that time zone. The default value is `'Etc/UTC'`.

# Limitation

- Only run this GitHub Action on organization repositories.
