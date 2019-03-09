# Chirp messages

Provides a simple system for retrieving and storing messages.

## Building

In order to build the Docker container you will need to run the following command:

```bash
docker build -t chirp-messages:latest
```

This will package the application up into a Docker image ready for deployment.

If you want to test the container in your local instance then you can by running:

```bash
docker run --rm -p 3000:3000 chirp-messages:latest
```

The logs are output in a JSON format, you can make these into something a bit more friendly by installing `pino-pretty` and running the container:

```bash
npm i -g pino-pretty
docker run --rm -p 3000:3000 chirp-messages:latest | pino-pretty
```
