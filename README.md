# todo-express-firebase-typescript

A TODO backend API with typescript, express and firebase

## Prerequisite

1. Firebase production credential. Place it to {project_directory}/.key.json
2. .env

```
GOOGLE_APPLICATION_CREDENTIALS=./.key.json
PORT=8000
```

3. docker-compose v3.4(optional but recommended)

## Using docker compose

All three test, development and production version of this project could be run with docker compose

| env         |
| ----------- |
| test        |
| development |
| production  |

```
> docker-compose -f docker-compose.{env}.yml up --build
```

## NOT using docker compose

1. if docker is not used, please manually add the environment variable accordingly!!!

## Development

1. Start a local firebase emulator

```
> yarn start:dev:db
```

2. Build and launch the docker-compose

```
> docker-compose -f docker-compose.development.yml up --build
```

## Unit testing

1. Start a local firebase emulator

```
> yarn start:test:db
```

2. Launch the docker-compose

```
> docker-compose -f docker-compose.test.yml up --build
```

## Production

1. Make sure you have the key saved as .key.json
2. Launch the docker-compose

```
> docker-compose -f docker-compose.production.yml up --build
```

# FAQ

## A. How to get firebase credential

- 1. Create a firebase project
- 2. Go to project console
- 3. Go to project setting
- 4. Go to project setting
- 5. Click service account tag
- 6. Click generate private key

B.
