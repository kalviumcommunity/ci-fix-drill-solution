# CI Pipeline Diagnosis

## Failure 1 — Test Assertion Error
Step: Run unit tests
Log evidence: "FAIL src/payments/calculateDiscount.test.js — Expected: 100, Received: 90"
Root cause: The test asserts `toBe(100)` but the function correctly returns 90 (100 minus 10%). The test assertion was wrong, not the function.
Fix applied: Changed `toBe(100)` to `toBe(90)` in calculateDiscount.test.js line 9.

## Failure 2 — toBe on Object
Step: Run unit tests
Log evidence: "FAIL src/utils/formatCurrency.test.js — Expected: {"amount":10.01,"currency":"USD"}, Received: {"amount":10.01,"currency":"USD"}"
Root cause: `toBe` uses reference equality (===). Two objects with identical values are different references, so toBe always returns false for objects.
Fix applied: Changed `toBe` to `toEqual` in formatCurrency.test.js. toEqual performs deep value comparison.

## Failure 3 — Dependency Lockfile Mismatch
Step: Install dependencies
Log evidence: "npm ERR! code EUSAGE — npm ci can only install packages when your package.json and package-lock.json are in sync"
Root cause: lodash was added to package.json after package-lock.json was generated. npm ci detected the mismatch and failed.
Fix applied: Ran npm install locally to regenerate package-lock.json with lodash included. Committed the updated lockfile.

## Failure 4 — Workflow Sequencing and Scope
Step: Run tests (test job started before install job completed)
Log evidence: "sh: jest: not found" (because node_modules was empty on the fresh test job machine)
Root cause: The test job had no `needs: install` declaration, so it ran in parallel with the install job. Even with needs, each job runs on a fresh machine — the test job needed its own checkout and npm ci steps.
Fix applied: Merged install and test into one job, added checkout and npm ci before the test step, changed npm install to npm ci for reproducibility.
