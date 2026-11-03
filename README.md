# News API

An RS School project to migrate a news application from JavaScript to TypeScript.
Based on the [original application](https://github.com/rolling-scopes-school/news-JS).

[Task requirements](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/TS-news-api/migration-newip-to-ts.md)

## Features

- Choose a news publisher and read its first ten articles.
- Responsive news cards and a scrollable list of keyboard-accessible source buttons.
- Strict TypeScript, validated API responses, and separate HTTP, API, controller, and view modules.

## Run locally

1. Copy `.env.example` to `.env` and set the environment variables.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

## Production build

```sh
npm run build
```

The generated files are written to `dist/`.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```
