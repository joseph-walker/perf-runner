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
```

## Steps for starting runs / How it works

1) Create a Device entry in the devices table

2) Create a Target entry in the targets table. Set the number of runs to do and the service will start running.
Alternatively, set the number of runs to -1 to have this target run forever.

3) Add more targets to have the service start creating runs against other URLs or device configurations.
The service will iterate through all target candidates in a round-robin fashion until that target's run count is achieved,
after which it will drop out of consideration. If there are no valid targets, the service will idle until one becomes available.

## Default targets

To get some good Lighthouse-recommended device configurations, run this SQL command once your DB is set up to insert some
reasonable defaults:

```sql
INSERT INTO "devices"(
  "form_factor", "screen_width", "screen_height",
  "scale_factor", "name", "created_at",
  "updated_at", "cpu_slowdown_factor",
  "request_latency_ms", "round_trip_time_ms",
  "download_throughput_kbps", "upload_throughput_kbps"
)
VALUES
  (
    E'desktop', 1366, 768, 1, E'Default Desktop',
    E'2023-01-22 15:59:22.103271',
    E'2023-01-22 15:59:22.103271',
    1, 0, 0, 4096, 4096
  ),
  (
    E'mobile', 300, 800, 1, E'Fast Mobile',
    E'2023-01-22 21:23:06.840426',
    E'2023-01-22 21:23:06.840426',
    2, 50, 50, 4096, 4096
  ),
  (
    E'mobile', 300, 800, 1, E'Slow Mobile',
    E'2023-01-22 21:23:25.314042',
    E'2023-01-22 21:23:25.314042',
    4, 125, 75, 1024, 512
  ),
  (
    E'mobile', 300, 800, 1, E'Trash Mobile',
    E'2023-03-16 18:47:00.975257',
    E'2023-03-16 18:47:00.975257',
    6, 120, 75, 1024, 512
  );
```
