# Pushing Hours Restriction

This GitHub Action behaves like "pushing hours restriction" of the branch protection rule in the default branch.

You can restrict pushes to the default branch to pushing hours when you use this action.
For example, if you want to restrict pushes to working hours, you can set pushing hours as working hours. You can't merge(push) to the default branch outside of pushing hours in a pull request.

# Usage

This GitHub Action enables/disables [_Restrict who can push to matching branches_ rule of the branch protection](https://docs.github.com/en/github/administering-a-repository/about-protected-branches#restrict-who-can-push-to-matching-branches) automatically.

## 1. Create a branch protection

You need to create a branch protection for the default branch. You can refer to https://docs.github.com/en/github/administering-a-repository/managing-a-branch-protection-rule#creating-a-branch-protection-rule.

## 2. Create a workflow

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
      - uses: hamuyuuki/pushing-hours-restriction@v0.3.0
        with:
          appId: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          privateKey: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          startHour: 9
          endHour: 18
```

If you want reduce the number of executing actions, you can put this code.

```yaml
name: Pushing Hours Restriction

on:
  schedule:
    # NOTE: Execute startHour and endHour from Monday to Thursday with UTC
    - cron: '0 9,18 * * MON-THU'

jobs:
  pushing_hours_restriction:
    runs-on: ubuntu-latest
    steps:
      - uses: hamuyuuki/pushing-hours-restriction@v0.3.0
        with:
          appId: ${{ secrets.PUSHING_HOURS_RESTRICTION_APP_ID }}
          privateKey: ${{ secrets.PUSHING_HOURS_RESTRICTION_PRIVATE_KEY }}
          startHour: 9
          endHour: 18
```

# Inputs

## appId

If you authenticate with a GitHub App, you should set this input. You can set **App Id** of your GitHub App.

## privateKey

If you authenticate with a GitHub App, you should set this input. You can set **Private key** of your GitHub App.

## weekdays

This input is optional. You can set a comma delimited short weekday name like `'XXX,XXX'`. When you set a value to weekdays, you can enable pushing hours on that weekdays. The default value is 'MON,TUE,WED,THU'.

## startHour

This input is required. You can set a start of pushing hours.

## endHour

This input is required. You can set an end of pushing hours.

## timeZone

This input is optional. You can set an IANA time zone name (e.g. `'Asia/Tokyo'`). When you set a value to timeZone, you can enable pushing hours with that time zone. The default value is `'Etc/UTC'`.

# Authentication

You have two ways to authenticate. You can choose a GitHub Apps or a Personal Access Token.

## Using a GitHub App

If you use a GitHub App to authenticate, you don't need to create a GitHub user as a bot.

### 1. Create a GitHub App

You can create a new GitHub App on your organization account(e.g.: https://github.com/organizations/:organization/settings/apps/new).

When you create a GitHub App, you should select an access level to _Read & Write_ on the _Administration_ of _Repository permissions_. And you should _Only on this account_ option on the _Where can this GitHub App be installed?_.

### 2. Create a private key

You can generate a new private key on GitHub App settings.

### 3. Install the GitHub App

You can select _Install App_ menu and install your GitHub App to your organization account.

## Using a Personal Access Token

WIP

# Limitation

- Only run this GitHub Action on organization repositories.
- Restrict pushes to the default branch from Friday to Sunday.
