# A Tour of Restate with TypeScript

Restate is a system for easily building resilient applications, workflows, asynchronous tasks,
and event-driven applications.

This example contains the code for the `Tour of Restate` tutorial, for the TypeScript API.
This tutorial takes your through key Restate features by developing an end-to-end ticketing app.

❓ Learn more about Restate from the [Restate documentation](https://docs.restate.dev).

## Download the Tutorial

You can clone the example repository (`git clone https://github.com/restatedev/examples`) or just download this tutorial via

- **CLI:** `restate example typescript-tour-of-restate`

- **Zip archive:** `wget https://github.com/restatedev/examples/releases/latest/download/typescript-tour-of-restate.zip`

## Running the example

Have a look at the [Tour of Restate tutorial](https://docs.restate.dev/get_started/tour) in the documentation to build and run the application in this repository.

In short, you can run the different parts of the code via:

```
npm install
npm run build
npm run app
npm run part1
npm run part2
npm run part3
npm run part4 
```

## Start your restate server

```
restate-server --config-file config.toml
```

## Start your restate handlers

```
npm run dev
```

## Register your handlers to restate server

```
restate deployments register http://localhost:9080
```

## list services

```
restate services list
```

## list deployments

```
restate deployments list
```

## list invocations

```
restate invocations list
```

## inspecting K/V state

```
restate kv get -w -n 1 CartObject Thanhct
```

## Run with Jeager

```
docker run -d --name jaeger -e COLLECTOR_OTLP_ENABLED=true \
    -p 4317:4317 -p 16686:16686 jaegertracing/all-in-one:1.46

restate-server --tracing-endpoint http://localhost:4317 --config-file config.toml

http://localhost:16686
```
