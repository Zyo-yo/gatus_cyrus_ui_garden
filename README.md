# Assignment 12: Web Component Library

**Student:** Cyrus Gatus  
**Project:** UI Garden

A responsive React component library built with Create React App,
TypeScript, Storybook, and styled-components.

The React showcase demonstrates all 13 components. Storybook provides
individual examples, editable controls, and default/disabled states.

## Quick start

Open Docker Desktop and wait for its engine to start.

Open Ubuntu from PowerShell:

```powershell
wsl -d Ubuntu
```

Enter the development project:

```bash
cd ~/projects/gatus_cyrus_ui_garden
```

For a previously created assignment container:

```bash
docker start gatus_cyrus_coding_assignment12
```

Open http://localhost:8083.

For a first-time installation, follow the installation and Docker sections.

## Tools and prerequisites

Development used:

- Node.js 24
- npm 11
- Create React App 5.1.0
- React Scripts 5.0.1
- TypeScript 4.9.5
- Storybook 8.6.14
- styled-components 6.1.19
- jest-styled-components 7.2.0
- React Testing Library and Jest
- Docker Desktop with Linux containers
- Ubuntu through WSL 2

The committed package-lock.json records the resolved npm dependencies.

Docker alone is sufficient to build and run the production app.
Local Node.js and npm are needed for development, Storybook, and local tests.

Check tools inside Ubuntu:

```bash
node --version
npm --version
npx --version
docker --version
docker info
```

If Docker is unavailable inside Ubuntu:

1. Open Docker Desktop.
2. Go to Settings > Resources > WSL Integration.
3. Enable Ubuntu integration and apply the changes.
4. Open a new Ubuntu terminal and retry the Docker commands.

## Download and install

Download and extract this repository, or clone it using the repository's
actual HTTPS URL from GitHub's Code button:

```bash
git clone https://github.com/Zyo-yo/gatus_cyrus_ui_garden gatus_cyrus_ui_garden
cd gatus_cyrus_ui_garden
npm ci
```

The command above clones this assignment repository.

Run subsequent project commands from the directory containing
package.json and Dockerfile.

For WSL development, keep the project inside Ubuntu, such as:

```text
/home/<ubuntu-user>/projects/gatus_cyrus_ui_garden
```

The development location on this machine is:

```bash
cd ~/projects/gatus_cyrus_ui_garden
```

An older copy exists in the Windows GitHub directory. The Ubuntu copy
is the active project.

Do not copy node_modules between operating systems. Use `npm ci`
to install dependencies from the lockfile.

## Original project setup

The initial project was created with:

```bash
npx create-react-app@5.1.0 gatus_cyrus_ui_garden --template typescript
cd gatus_cyrus_ui_garden
```

These commands describe the original scaffold. Do not run them inside
the downloaded assignment.

CRA is used because it is explicitly required by the assignment.

Storybook 10 was initially installed, but its type declarations were
incompatible with the project's TypeScript 4.9 setup. The project was
changed to the following exact package versions:

```bash
npm install --save-dev --save-exact storybook@8.6.14 @storybook/react-webpack5@8.6.14 @storybook/preset-create-react-app@8.6.14 @storybook/addon-docs@8.6.14 @storybook/addon-essentials@8.6.14 @storybook/test@8.6.14 eslint-plugin-storybook@0.12.0
npm install --save-exact styled-components@6.1.19
npm install --save-dev --save-exact jest-styled-components@7.2.0
```

The repository includes the completed Storybook configuration and source.
Installing packages alone does not recreate those files.

Storybook configuration uses:

- `@storybook/react-webpack5` as the framework.
- `@storybook/preset-create-react-app` for CRA integration.
- `@storybook/addon-essentials` for Controls, Docs, Actions, and other tools.

Story files import `Meta` and `StoryObj` from `@storybook/react`.
Story test utilities come from `@storybook/test`.

## Run the React development app

```bash
npm start
```

Alternatively, prevent automatic browser opening:

```bash
BROWSER=none npm start
```

Open http://localhost:3000.

Press Ctrl+C in the terminal to stop the development server.

This is the development app. Docker serves a separate production build
at http://localhost:8083.

## Run Storybook

```bash
npm run storybook -- --no-open
```

Open http://localhost:6006.

Under Library, select a component and its Default or Disabled story.

Controls allow editing properties such as:

- Text, labels, titles, or descriptions where applicable
- Background colour
- Text colour
- Disabled state
- Dropdown options
- Image source and alternative text

Table content is demonstrated through its stories and the Composed example.

Disabled components override the selected background with #d1d5db.
Their cursor changes to not-allowed. Interactive components also block
their normal actions.

Images are faded and greyscaled in the disabled state so the changed
background remains visible.

Press Ctrl+C to stop Storybook. Run one development server at a time
on machines with limited resources.

### Storybook demonstration notes

- Library > Tables > Table > Composed combines all five table components.
- Change TableCell colours in TableCell > Default.
- Each table subcomponent owns its background. Changing the parent table's
  background does not override every child's normal colour.
- Disabling the composed table propagates through its component children.
- Storybook control edits are temporary unless explicitly saved.
- The Example section contains generated Storybook starter examples.

## Component files

Components are located in src/components.

Each required component folder contains:

```text
ComponentName.tsx
ComponentName.stories.tsx
ComponentName.types.tsx
ComponentName.tests.tsx
Index.ts
```

| Component | Purpose |
| --- | --- |
| Button | Native button with editable label and colours |
| Label | Text label with optional input association |
| Text | Responsive paragraph |
| Table | Responsive table container |
| TableHeader | Table header section using thead |
| TableRow | Table row using tr |
| TableCell | Table data cell using td |
| TableFooter | Table footer section using tfoot |
| Dropdown | Labelled native select |
| RadioButton | Labelled native radio input |
| Img | Responsive image with caption |
| HeroImage | Image section with headline and description |
| Card | Image, heading, and descriptive content |

tableState.tsx shares the disabled state between composed table components.

The local sample image is public/images/garden.svg.
It does not require an external image service.

## Automated tests

### TypeScript

```bash
npx tsc --noEmit
```

A successful check returns to the prompt without errors.

### All component tests

```bash
CI=true npm test -- --watchAll=false --runInBand --testMatch='**/src/components/**/*.tests.tsx'
```

Expected result: **36 passing tests across 13 component suites**.

Each component has tests for:

1. Visibility.
2. Background colour changing when disabled.

Additional tests cover interactions such as disabled clicks, dropdown
selection, label activation, and radio-group behaviour.

jest-styled-components checks the generated CSS rules, including the
native disabled selector used by Button and Dropdown.

### React showcase interaction test

```bash
CI=true npm test -- --watchAll=false --runInBand App.test.tsx
```

Expected result: **1 passing showcase test**.

This test checks that:

- The button increments its click count.
- The global toggle disables the button, dropdown, and radio inputs.
- Clicking the disabled button does not increment the count.
- Re-enabling the components restores button interaction.

The component and showcase commands together run **37 tests**.

The explicit component test pattern is necessary because the assignment
requires `.tests.tsx`, while CRA normally discovers `.test.tsx`.

## Responsive and manual verification

Use Storybook's viewport tools or resize the browser.

Check a narrow viewport around 375px and a desktop viewport:

1. Text wraps within its container.
2. Images scale without overflowing.
3. Form controls remain usable.
4. Cards and showcase columns adapt to the available width.
5. The table remains within the page; its wrapper allows horizontal
   scrolling if needed.
6. Default and disabled states show the intended colours and cursors.

Automated DOM tests do not replace these browser layout checks.

## Production builds

Build the optimized React showcase:

```bash
npm run build
```

Output: build/

Build the static Storybook:

```bash
npm run build-storybook
```

Output: storybook-static/

Both builds completed successfully during development.
Storybook reported bundle-size warnings; these did not prevent its build.

The Dockerfile serves the CRA showcase production build.
Storybook is run separately for component documentation and controls.

## Docker configuration

The Dockerfile uses two stages:

1. Node installs locked dependencies with `npm ci` and runs `npm run build`.
2. Nginx serves only the resulting production files.

Both stages use the required working directory:

```text
/gatus_cyrus_ui_garden
```

nginx.conf sets this directory as the website root.

The final container runs Nginx, rather than the React development server.

.dockerignore excludes node_modules, generated builds, Git metadata,
coverage, and npm debug logs from the build context.

### Build the production image

Open Docker Desktop and wait for the engine to start.

From the project directory:

```bash
docker build -t gatus_cyrus_assignment12 .
```

The final dot supplies the current project as the build context.

### Create and run the container

```bash
docker run -d -p 8083:80 --name gatus_cyrus_coding_assignment12 gatus_cyrus_assignment12
```

Open http://localhost:8083.

- Container name: gatus_cyrus_coding_assignment12
- Host port: 8083
- Container port: 80
- Working directory: /gatus_cyrus_ui_garden

The container name is assigned with `--name` when creating the container.
It is not assigned by the Dockerfile.

### Verify the deployment

Show the running container and port mapping:

```bash
docker ps --filter name=gatus_cyrus_coding_assignment12
```

Check the working directory:

```bash
docker exec gatus_cyrus_coding_assignment12 pwd
```

Expected:

```text
/gatus_cyrus_ui_garden
```

Show the production files:

```bash
docker exec gatus_cyrus_coding_assignment12 ls
```

Expected contents include index.html, static, and images.

Check the HTTP response:

```bash
curl -I http://localhost:8083
```

Expected status: HTTP 200.

View server logs:

```bash
docker logs gatus_cyrus_coding_assignment12
```

The Docker-hosted showcase loaded successfully during development.
The commands above allow the presenter or reviewer to verify its
configuration directly.

### Stop and restart

```bash
docker stop gatus_cyrus_coding_assignment12
docker start gatus_cyrus_coding_assignment12
```

An existing container can be started from any directory.

Use `docker start` for an existing container. Repeating `docker run`
with the same name causes a name conflict.

### Apply source changes to Docker

The image contains a snapshot of the source at build time.
Source edits do not update the running container automatically.

Build the updated image first:

```bash
docker build -t gatus_cyrus_assignment12 .
```

Then replace only this assignment container:

```bash
docker stop gatus_cyrus_coding_assignment12
docker rm gatus_cyrus_coding_assignment12
docker run -d -p 8083:80 --name gatus_cyrus_coding_assignment12 gatus_cyrus_assignment12
```

Open http://localhost:8083 and refresh.

## Presentation walkthrough

### Before presenting

1. Open Docker Desktop and wait for its engine.
2. Open Ubuntu:

   ```powershell
   wsl -d Ubuntu
   ```

3. Enter the project:

   ```bash
   cd ~/projects/gatus_cyrus_ui_garden
   ```

4. Have the test commands, Storybook, and Docker commands below ready.
5. If source files changed, rebuild the image and replace the container
   using the update instructions above.

### 1. Introduce the project

Say:

“UI Garden is my React and TypeScript component library. It uses
styled-components for styling, Storybook for isolated examples and
controls, and Jest with React Testing Library for automated tests.”

### 2. Demonstrate the Docker production app

Start the existing container:

```bash
docker start gatus_cyrus_coding_assignment12
```

Open http://localhost:8083.

Demonstrate:

- All component sections, including the table and images.
- The button click counter.
- Dropdown selection.
- Radio buttons selecting one option at a time.
- The global disabled toggle.
- Grey backgrounds, prohibited cursors, and blocked form interactions.
- The responsive layout at a narrow browser width.

Explain:

“This page is an optimized CRA production build served by Nginx inside
Docker. Host port 8083 maps to the container's port 80.”

### 3. Prove the Docker requirements

```bash
docker ps --filter name=gatus_cyrus_coding_assignment12
docker exec gatus_cyrus_coding_assignment12 pwd
curl -I http://localhost:8083
```

Point out:

- gatus_cyrus_coding_assignment12
- Port 8083 mapped to 80
- /gatus_cyrus_ui_garden
- HTTP 200

Open Dockerfile and nginx.conf to explain the build and serving stages.

### 4. Demonstrate Storybook

```bash
npm run storybook -- --no-open
```

Open http://localhost:6006.

Demonstrate:

1. Library > Button > Default.
2. Change its label and background colour in Controls.
3. Enable disabled and show the grey background and cursor.
4. Open its Disabled story.
5. Open Dropdown and RadioButton.
6. Open Tables > Table > Composed.
7. Open TableCell > Default and change its background.
8. Open Img, HeroImage, and Card.
9. Use a narrow viewport to demonstrate responsiveness.

Explain that the disabled background intentionally overrides the
custom background colour.

Press Ctrl+C before running tests.

### 5. Demonstrate automated tests

```bash
CI=true npm test -- --watchAll=false --runInBand --testMatch='**/src/components/**/*.tests.tsx'
```

Show the 36 passing component tests.

```bash
CI=true npm test -- --watchAll=false --runInBand App.test.tsx
```

Show the passing showcase test.

Explain:

“Every component has a visibility test and a disabled background test.
There are also interaction tests, including tests that disabled controls
do not perform their actions.”

### 6. Show the source structure

Open the project in VS Code:

```bash
code .
```

Expand src/components/Button and explain:

- Button.tsx: component behaviour and styled-components CSS.
- Button.types.tsx: accepted TypeScript props.
- Button.stories.tsx: default/disabled examples and Controls.
- Button.tests.tsx: automated checks.
- Index.ts: exports for importing the component elsewhere.

Show the media queries used for responsive styling.

### 7. Explain production builds

```bash
npm run build
npm run build-storybook
```

Explain:

“The first command builds the showcase for production. The second
creates static Storybook documentation. Docker builds and serves the
showcase.”

These builds can be prepared before the presentation if time is limited.

### 8. Finish

Stop the assignment container when finished:

```bash
docker stop gatus_cyrus_coding_assignment12
```

## Assignment requirement mapping

| Requirement | Implementation |
| --- | --- |
| Create React App and TypeScript | react-scripts and TSX source |
| Storybook | .storybook configuration and component stories |
| styled-components | Styling in component TSX files |
| Button, Label, Text | Individual component folders |
| Table and four subcomponents | Table, TableHeader, TableRow, TableCell, TableFooter |
| Dropdown and radio button | Dropdown and RadioButton |
| Img, Hero Image, Card | Img, HeroImage, Card |
| Five required files per folder | Component, stories, types, tests, Index |
| Responsive components | Fluid sizing, wrapping, media queries, table wrapper |
| Editable text and background controls | Storybook argTypes and args where applicable |
| Default and disabled states | Default and Disabled stories for all 13 components |
| Disabled appearance and cursor | Grey background and not-allowed cursor |
| At least two tests per component | 36 component tests |
| Optimized web app | CRA production build |
| Production Docker hosting | Node build stage and Nginx runtime |
| localhost:8083 | Docker port mapping 8083:80 |
| Required container name | gatus_cyrus_coding_assignment12 |
| Required working directory | /gatus_cyrus_ui_garden |

## Troubleshooting

### Storybook Controls is missing

Confirm .storybook/main.ts includes `@storybook/addon-essentials`.
Restart Storybook after changing its configuration.

### Background colour appears unchanged

Select the component's Default story and set disabled to false.
Disabled styling overrides custom colours.

For TableCell, only the cell background changes, not the whole preview.
The colour picker may initially be positioned on white.

### Startup is very slow in WSL

Work from ~/projects/gatus_cyrus_ui_garden inside Ubuntu.
Reading thousands of dependencies through /mnt/c was slow during setup.

Keep the computer awake and avoid running duplicate development servers.

### Docker shows an older version

Rebuild the image and replace the assignment container using the
“Apply source changes to Docker” commands.

### Container name is already in use

Start the existing container:

```bash
docker start gatus_cyrus_coding_assignment12
```

For an updated image, follow the container replacement instructions.

### Port 8083 is occupied

Inspect running containers:

```bash
docker ps
```

Identify the application using port 8083 before stopping anything.
Keep port 8083 for this assignment.

### npm security findings

npm reported dependency vulnerabilities during installation.
They remain an acknowledged limitation of the current dependency tree.

Inspect the report:

```bash
npm audit
```

Do not automatically apply `npm audit fix --force`; it may introduce
breaking dependency changes. Passing tests does not resolve audit findings.

## Submission

Before submitting:

1. Publish the current Ubuntu project to GitHub.
2. Replace the repository URL placeholder in this README with its real URL.
3. Confirm GitHub contains the source, Storybook configuration,
   package.json, package-lock.json, Dockerfile, nginx.conf,
   .dockerignore, README.md, and local image asset.
4. Exclude node_modules and generated build directories from Git.
5. Submit Dockerfile and README.md through LEARN.
6. Include the GitHub repository link.
7. Confirm the submission receipt.

GitHub repository: https://github.com/Zyo-yo/gatus_cyrus_ui_garden

## References

- Create React App: https://create-react-app.dev/
- Storybook 8 documentation: https://storybook.js.org/docs/8/
- styled-components: https://styled-components.com/docs
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- jest-dom: https://github.com/testing-library/jest-dom
- jest-styled-components: https://github.com/styled-components/jest-styled-components
- Docker: https://docs.docker.com/
