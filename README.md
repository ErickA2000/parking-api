<h1 align="center">Parking API</h1>


## Table of contents

- [Developing](#developing)
- [Building](#building)
- [Building with docker](#building-with-docker)
- [Testing](#testing)
- [Linting](#linting)
- [Production](#production)

Note: Check the .env.example file to know about environment variables

- [Postman Collection](https://www.postman.com/miraiisoft/workspace/public-collections/collection/36160797-b90c7c5c-3a27-41d4-a62d-595be626e66c?action=share&creator=36160797&active-environment=36160797-34a0b54f-915c-40a5-a400-994c5d772522)

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