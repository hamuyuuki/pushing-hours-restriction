# Contributing to Pushing Hours Restriction

## Development

### Dependencies

- Node.js 16.x

### Setup

```
npm install
```

### Unit test

```
npm run test ./__tests__/pushing-hours-restriction.test.ts
```

### E2E test

CI workflow runs it. You can create a feature branch and push a commit.

## Release

Please upgrade [a version of package.json](https://github.com/hamuyuuki/pushing-hours-restriction/blob/main/package.json#L3) and push a commit. Then CD workflow updates a package and creates a release note.
