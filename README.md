# ci-fix-drill

Assignment repository for LU 2.2 — Fixing Broken Tests in CI Pipelines.

## Repository Structure

| Path | Purpose |
|---|---|
| `src/payments/` | Payment calculation functions and tests |
| `src/utils/` | Utility functions and tests |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline |
| `DIAGNOSIS.md` | Root cause analysis of CI failures |

## CI Pipeline

| Stage | Command | Purpose |
|---|---|---|
| Install | `npm ci` | Reproducible locked dependency install |
| Test | `npm test` | Jest unit test suite |

## Common Failures Fixed

| Failure | Root Cause | Fix |
|---|---|---|
| Assertion mismatch | `toBe(100)` when function returns 90 | Changed to `toBe(90)` |
| Object comparison | `toBe` on object uses reference equality | Changed to `toEqual` |
| Lockfile mismatch | lodash in package.json but not lockfile | Regenerated lockfile with `npm install` |
| Job sequencing | Test job ran before install on fresh machine | Merged into single job with npm ci |
