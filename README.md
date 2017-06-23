# html-archiver
An API that allows users to submit job requests by url and retrieve html by job id.

A web platform that allows users to retrieve html by url or job id.

Uses a queue and worker to process jobs which entail downloading html.

Uses MySQL for persistent record of assets.

# How to RESTful API

Get request for jobs endpoint where id is a number (ex: 1)
```
curl http://127.0.0.1:3000/jobs/id
```
If job complete, returns HTML.
If job incomplete, returns string with job id.

Post request for jobs endpoint where weburl is a string (ex: www.google.com)
```
curl -X POST 127.0.0.1:3000/jobs?url=weburl
```

If job complete, returns HTML.
If job incomplete, returns string with job id.

# Requirements
Redis, MySQL

# Setup
- Run in command line in root directory:
```
npm install
```
- Fill out .env file with example.env as template

- Run in command line to create database and table:
```
mysql -u (DB_USER) < db/schema.sql
```
- Run in command line to login and start server:
```
mysql -u (DB_USER) -p (DB_PASSWORD)
```

where DB_USER and DB_PASSWORD refer to your MySQL username and password

# Startup
- Run in command line in root directory:
```
npm run dev
```
- Next run in command line in root directory in a separate shell:
```
npm run server-dev
```
