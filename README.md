## Launch of the project

```
npm install - install dependencies
npm run start:dev or npm run start:dev:vite - start server + frontend project in dev mode
```

---

## Scripts

- `npm run start` - Run frontend project on webpack dev server
- `npm run start:vite` - Run frontend project on vite
- `npm run start:dev` - Run frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Run frontend project on vite + backend
- `npm run start:dev:server` - Run backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minified)
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss style files with linter
- `npm run lint:scss:fix` - Fixing scss files with style linter
- `npm run test:unit` - Run unit tests with jest
- `npm run test:ui` - Run screenshot tests with loki
- `npm run test:ui:ok` - Confirm new screenshots
- `npm run test:ui:ci` - Run screenshot tests in CI
- `npm run test:ui:report` - Generate full report for screenshot tests
- `npm run test:ui:json` - Generate json report for screenshot tests
- `npm run test:ui:html` - Generate HTML report for screenshot tests
- `npm run storybook` - run Storybook
- `npm run storybook:build` - Build storybook build
- `npm run prepare` - precommit hooks
- `npm run generate:slice` - Script for generating FSD slices

---

## Project architecture

The project is written in accordance with the Feature sliced ​​design methodology

Link to documentation - [feature sliced ​​design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Working with translations

The project uses the i18next library to work with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

---

## Tests

The project uses 4 types of tests:

1. Regular unit tests on jest - `npm run test:unit`
2. Component tests with React testing library -`npm run test:unit`
3. Screenshot testing with loki `npm run test:ui`
4. e2e testing with Cypress `npm run test:e2e`

More about tests - [testing documentation](/docs/tests.md)

---

## Linting

The project uses eslint to check typescript code and stylelint to check style files.

Also, for strict control of the main architectural principles,
our own eslint plugin _eslint-plugin-ulbi-tv-plugin_ is used,
which contains 3 rules

1. path-checker - prohibits the use of absolute imports within one module
2. layer-imports - checks the correctness of the use of layers from the FSD point of view
   (for example, widgets cannot be used in features and entities)
3. public-api-imports - allows imports from other modules only from the public api. Has auto fix

##### Running linters

- `npm run lint:ts` - Checking ts files with a linter
- `npm run lint:ts:fix` - Fixing ts files with a linter
- `npm run lint:scss` - Checking scss style files with a linter
- `npm run lint:scss:fix` - Fixing scss style files with a linter

---

## Storybook

The project describes story cases for each component.
Server requests are mocked using storybook-addon-mock.

The story case file is created next to the component with the extension .stories.tsx

You can run the storybook with the command:

- `npm run storybook`

More about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button, ButtonSize, ButtonTheme } from "./Button";
import React from "react";

const meta = {
  title: "shared/Button",
  component: Button,

  tags: ["autodocs"],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Text",
  },
};

export const Clear: Story = {
  args: {
    children: "Text",
    theme: ButtonTheme.CLEAR,
  },
};
```

---

## Project configuration

For development, the project contains 2 configs:

1. Webpack - ./config/build
2. vite - vite.config.ts

Both assemblers are adapted to the main features of the application.

The entire configuration is stored in /config

- /config/babel - babel
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

The `scripts` folder contains various scripts for refactoring\simplifying code writing\report generation, etc.

---

## CI pipeline and pre commit hooks

The github actions configuration is in /.github/workflows.
All types of tests, project and storybook builds, and linting are run in ci.

In pre commit hooks, we check the project with linters, the config is in /.husky

---

### Working with data

Interaction with data is carried out using redux toolkit.
If possible, reusable entities should be normalized using EntityAdapter

Requests to the server are sent using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (so as not to pull them into a common bundle), use
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

---

## Entitiesv

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [addCommentForm](/src/features/addCommentForm)
- [articleRating](/src/features/articleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)
