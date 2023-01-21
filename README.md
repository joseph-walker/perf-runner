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
