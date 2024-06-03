<h1 align="center">Express Typescript Template</h1>

<p align="center">
    Template for new project based on express
</p>

## Table of contents

- [Developing](#developing)
- [Building](#building)
- [Building with docker](#building-with-docker)
- [Testing](#testing)
- [Linting](#linting)
- [Production](#production)

## Developing

To start the project in development mode you need to run the following commands.

```bash
npm run build:watch
```
To listen for changes and transpile the code.

```bash
npm run dev
```
To start the server and refresh the changes.

## Building
```bash
npm run build
```

## Building with docker

```bash
docker build -t imageName:tag .
```

## Testing

Jest as a test library

```bash
npm run test
```

## Linting

Run the linter

```bash
npm run lint
```

Fix lint issues automatically

```bash
npm run lint:fix
```

## Production

```bash
npm run start
```