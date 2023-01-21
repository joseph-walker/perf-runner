# Perf Runner

## Requirements

- Node v19.4.0+
- PostgreSQL - On Mac, use [Postgres.app](https://postgresapp.com/)

## Local Setup

- Ensure Postgres service is running and create a new database name `lighthouse`
- Create new user `lighthouse` with password `lighthouse-root` granted permissions on the `lighthouse` database
- `npm install`

## Running

No builds are set up and the script is run through `ts-node`. Run the following:

```bash
npm run start
# or
npm run start:dev
```

## Steps for starting runs / How it works

1) Create a Device entry in the devices table

2) Create a Target entry in the targets table. Set the number of runs to do and the service will start running.
Alternatively, set the number of runs to -1 to have this target run forever.

3) Add more targets to have the service start creating runs against other URLs or device configurations.
The service will iterate through all target candidates in a round-robin fashion until that target's run count is achieved,
after which it will drop out of consideration. If there are no valid targets, the service will idle until one becomes available.
