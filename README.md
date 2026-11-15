# Assignment 13: UI Component Library with Build Checks

**Student:** Cyrus Gatus

This assignment extends the React component library from Assignment 12
with automated code quality checks.

## Assignment 13 location

Repository:
https://github.com/Zyo-yo/gatus_cyrus_ui_garden

Assignment branch:
https://github.com/Zyo-yo/gatus_cyrus_ui_garden/tree/assignment13

Use the assignment13 branch. The master branch contains the earlier
Assignment 12 version until changes are merged.

## Requirements implemented

| Requirement                 | Implementation                                                |
| --------------------------- | ------------------------------------------------------------- |
| Production CRA application  | React Scripts production build served by Nginx                |
| Website address             | http://localhost:8018 or http://127.0.0.1:8018                |
| Container name              | gatus_cyrus_coding_assignment13                               |
| Working directory           | /gatus_cyrus_ui_garden_build_checks                           |
| Prettier check              | npm run format:check                                          |
| ESLint check                | npm run lint                                                  |
| Automated tests             | npm run test:ci                                               |
| Additional TypeScript check | npm run typecheck                                             |
| Local pre-commit checks     | Husky runs npm run check                                      |
| Remote checks               | GitHub Actions runs npm run check on pushes and pull requests |
| Build checks                | Docker and GitHub Actions also build the production app       |

## Instructor quick start: Docker

Prerequisites:

- Docker installed and running with Linux-container support.
- Internet access to download base images and npm dependencies.
- An available host port 8018.

Local Node.js, npm, and Storybook installations are not required
for the Docker instructions.

Clone the assignment branch:

```bash
git clone --branch assignment13 --single-branch https://github.com/Zyo-yo/gatus_cyrus_ui_garden.git
cd gatus_cyrus_ui_garden
```

Alternatively, download the ZIP from the assignment13 branch and extract it.
Open a terminal in the directory containing Dockerfile and package.json.
A ZIP download does not require Git to build the Docker image.

Build:

```bash
docker build -t gatus_cyrus_assignment13 .
```

Create and start the required container:

```bash
docker run -d -p 8018:80 --name gatus_cyrus_coding_assignment13 gatus_cyrus_assignment13
```

Open http://localhost:8018.

The build installs dependencies from package-lock.json, runs quality
checks and tests, and creates the production build inside Docker.

Local node_modules, existing build output, and .git are excluded.
No files outside the submitted project are required.

The image uses standard Node and Nginx Linux images without a
machine-specific CPU platform override. The clean build and runtime
were verified on the student's machine; other devices have not yet
been independently tested.

## Verify the Docker requirements

```bash
docker ps --filter name=gatus_cyrus_coding_assignment13
docker exec gatus_cyrus_coding_assignment13 pwd
curl -I http://127.0.0.1:8018
```

Expected:

- Container name: gatus_cyrus_coding_assignment13
- Port mapping: 8018:80
- Working directory: /gatus_cyrus_ui_garden_build_checks
- HTTP response: 200 OK

Show production files and logs:

```bash
docker exec gatus_cyrus_coding_assignment13 ls
docker logs gatus_cyrus_coding_assignment13
```

## Stop, restart, and update Docker

Stop:

```bash
docker stop gatus_cyrus_coding_assignment13
```

Restart the existing container:

```bash
docker start gatus_cyrus_coding_assignment13
```

Use docker start for an existing container. Repeating docker run with
the same name produces a name conflict.

After changing source, build a new image:

```bash
docker build -t gatus_cyrus_assignment13 .
```

Then replace only this assignment container:

```bash
docker stop gatus_cyrus_coding_assignment13
docker rm gatus_cyrus_coding_assignment13
docker run -d -p 8018:80 --name gatus_cyrus_coding_assignment13 gatus_cyrus_assignment13
```

To verify a build without cached build steps:

```bash
docker build --no-cache -t gatus_cyrus_assignment13 .
```

## Dockerfile explanation

The Node build stage:

1. Uses /gatus_cyrus_ui_garden_build_checks as its working directory.
2. Runs npm ci using the committed dependency lockfile.
3. Runs npm run check.
4. Runs npm run build.

HUSKY=0 disables Git hook installation inside Docker because .git is
not part of the build context. It does not disable the explicit checks.

CI=true enables CI behaviour during tests and the production build.

The final Nginx stage contains the production website, rather than
the development server or Node dependency tree.

nginx.conf serves files from the required working directory.
EXPOSE 80 documents the internal port; docker run publishes it as 8018.

## Local development setup

For Windows, open Ubuntu from PowerShell:

```powershell
wsl -d Ubuntu
```

The existing development project is:

```bash
cd ~/projects/gatus_cyrus_ui_garden
git switch assignment13
```

For a fresh clone, use the clone instructions above.

Development uses Node.js 24. Check the tools:

```bash
node --version
npm --version
git --version
```

Install the locked dependencies:

```bash
npm ci
```

The package.json prepare script runs Husky to install local Git hooks.

Verify:

```bash
git config --get core.hooksPath
```

Expected: .husky/\_

Use a Git clone for pre-commit demonstrations. A ZIP download has no
Git repository and cannot demonstrate commits until Git is initialized.

## Quality tools and commands

Tools added for Assignment 13:

```bash
npm install --save-dev --save-exact eslint@8.57.1 prettier@3.6.2 husky@9.1.7 eslint-config-prettier@9.1.0
```

ESLint 8 is used for compatibility with CRA's existing ESLint configuration.

Husky was initialized with:

```bash
npx husky init
```

The generated .husky/pre-commit was replaced with:

```sh
npm run check
```

For an existing clone, use npm ci rather than repeating initialization.

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| npm run format          | Apply Prettier formatting                    |
| npm run format:check    | Check formatting without changing files      |
| npm run lint            | ESLint checks with zero warnings allowed     |
| npm run typecheck       | TypeScript validation without emitting files |
| npm run test:ci         | All tests, without watch mode                |
| npm run check           | Run all four checks sequentially             |
| npm run build           | Build the optimized CRA showcase             |
| npm run build-storybook | Build static Storybook documentation         |

Run the complete pipeline:

```bash
npm run check
```

Expected: formatting, lint, and TypeScript pass; 37 tests pass
across 14 suites.

The test pattern discovers both .test.tsx and .tests.tsx files.
This includes all component tests and the showcase interaction test.

## Husky pre-commit behaviour

Every normal commit runs npm run check.

The pipeline stops at the first failed command. The commit is rejected
with a nonzero exit status.

The hook checks the working tree. Stage the intended final changes
before committing. GitHub Actions independently checks the committed
snapshot after it is pushed.

Inspect and commit changes:

```bash
git status --short
git diff
git add .
git commit -m "Describe the changes"
```

The following failures were verified with real attempted commits:

- An unformatted JSON file was rejected by Prettier.
- An undefined JavaScript variable was rejected by ESLint.
- A deliberately failing test was rejected by Jest.

All demonstration files were removed afterward.

TypeScript checking was also added because CRA's ESLint configuration
leaves some TypeScript correctness checks to the TypeScript compiler.

### Reproduce a formatting rejection

Start with a clean staging area. Ensure quality-check-demo.json does
not already exist.

```bash
printf '{"demo":true}' > quality-check-demo.json
git add -- quality-check-demo.json
git commit -m "Demonstrate formatting rejection"
```

Expected: Prettier fails and no commit is created.

Clean up after the expected rejection:

```bash
git restore --staged -- quality-check-demo.json
rm -- quality-check-demo.json
```

Verify recovery:

```bash
npm run check
```

## GitHub Actions

Workflow file: .github/workflows/quality-checks.yml

The workflow runs on:

- Pushes to any branch.
- Pull requests.
- Manual workflow dispatch where available.

It uses an Ubuntu runner with Node.js 24 and performs:

1. Repository checkout.
2. npm ci.
3. npm run check.
4. npm run build.

HUSKY=0 skips installing developer hooks on the runner.
The remote workflow explicitly executes all checks regardless of
whether local commit hooks ran.

A failed command fails the workflow, producing a red failure status
and diagnostic logs in the repository's Actions tab.

Email notifications depend on the user's GitHub notification settings.
Review the repository's Actions tab to confirm the result.

Local hooks can be bypassed. GitHub Actions detects failures after a
push; it does not prevent the push itself. To block merging failed
changes, configure branch protection or a ruleset requiring the
"Quality checks and production build" status check.

Remote workflow verification: pending the first pushed workflow run.

## Run the component library locally

React development showcase:

```bash
BROWSER=none npm start
```

Open http://localhost:3000. Press Ctrl+C to stop.

Storybook:

```bash
npm run storybook -- --no-open
```

Open http://localhost:6006. Press Ctrl+C to stop.

The production Docker showcase is separately available at
http://localhost:8018.

## Presentation walkthrough

1. Open Docker Desktop and Ubuntu.

2. Enter the project:

   ```bash
   cd ~/projects/gatus_cyrus_ui_garden
   ```

3. Start the existing container:

   ```bash
   docker start gatus_cyrus_coding_assignment13
   ```

4. Open http://localhost:8018. Demonstrate the component library and
   its global disabled toggle.

5. Prove the required container settings:

   ```bash
   docker ps --filter name=gatus_cyrus_coding_assignment13
   docker exec gatus_cyrus_coding_assignment13 pwd
   curl -I http://127.0.0.1:8018
   ```

6. Run the quality checks:

   ```bash
   npm run check
   ```

   Explain that formatting, code linting, TypeScript, and tests all pass.

7. Show .husky/pre-commit and reproduce the formatting rejection using
   the commands above. Remove the demonstration file afterward.

8. Open .github/workflows/quality-checks.yml and explain that the remote
   runner repeats the checks even if local hooks are bypassed.

9. Open GitHub's Actions tab. Show a verified successful workflow run
   and, once demonstrated, a failed run with its diagnostic logs.

10. Show Dockerfile. Explain that quality checks run before the
    production build and Nginx serves the final output.

11. Stop the container when finished:

    ```bash
    docker stop gatus_cyrus_coding_assignment13
    ```

## Known limitations

npm reports vulnerabilities in the existing dependency tree.
These have not been resolved by formatting or passing tests.

Inspect them separately:

```bash
npm audit
```

Do not apply npm audit fix --force without reviewing its breaking changes.

## Submission

- Submit Dockerfile and this README through LEARN.
- Include the assignment13 branch link.
- Keep nginx.conf, package.json, package-lock.json, source, quality
  configuration, Husky hook, and workflow committed in the repository.
- Do not submit node_modules or generated build folders.
- Confirm GitHub Actions results before submission.
- Confirm the LEARN submission receipt.

## References

- Husky: https://typicode.github.io/husky/
- Prettier: https://prettier.io/docs/install
- ESLint: https://eslint.org/docs/v8.x/
- GitHub Actions: https://docs.github.com/en/actions
- Docker: https://docs.docker.com/
