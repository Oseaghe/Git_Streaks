# Git_Streaks

A small service for tracking GitHub contribution streaks per user. This repository contains a Java (Maven) backend API and a React frontend (in the `frontend/` folder). The backend fetches or computes streak data and exposes a simple API consumed by the frontend.

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started (development)](#getting-started-development)
- [Running with Docker](#running-with-docker)
- [API](#api)
- [Frontend](#frontend)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Track GitHub contribution streaks for one or more usernames
- Backend API with endpoints for health and streak queries
- React frontend with modern UI to display streak cards and progress
- Dockerfile for containerized deployment

## Architecture

- Backend: Java (Maven) — likely a Spring Boot application (project contains `pom.xml`, `mvnw` wrappers and `src/`)
- Frontend: React app located at `/frontend` (see `frontend/README.md` for details)
- The frontend calls backend API endpoints (default: `http://localhost:8080`)

## Tech stack

- Java, Maven (backend)
- React, Styled Components, Framer Motion (frontend)
- Docker (containerization)

## Getting started (development)

Prerequisites:
- Java 11+ (or the version configured in `pom.xml`)
- Maven or use the included Maven wrapper (`./mvnw`)
- Node.js and npm for the frontend

Backend (run locally):

1. From repository root, run using the Maven wrapper:

```bash
./mvnw spring-boot:run
```

or build and run the jar:

```bash
./mvnw package -DskipTests
java -jar target/*.jar
```

2. The API will be available by default at `http://localhost:8080`.

Frontend (development):

1. Change to the frontend folder and follow its README:

```bash
cd frontend
npm install
npm start
```

2. Open `http://localhost:3000` and ensure the frontend can reach the backend at `http://localhost:8080`.

## Running with Docker

The repository includes a `Dockerfile` to build the backend image. Example:

```bash
# build image
docker build -t git-streaks:latest .

# run container (map port 8080)
docker run -p 8080:8080 --env-file .env.example git-streaks:latest
```

Adjust environment variables as needed.

## API

The frontend expects the following endpoints (documented here for convenience):

- `GET /api/streaks/health` - returns simple health info
- `POST /api/streaks` - accepts JSON body `{ "usernames": ["username1","username2"] }` and returns an array of streak objects

Example request:

```json
{
  "usernames": ["octocat", "anotheruser"]
}
```

Example response:

```json
[
  {
    "username": "username1",
    "currentstreak": 15,
    "lastCommitDate": "2024-01-15",
    "commitedToday": true
  }
]
```

Note: See the frontend `README.md` for the exact request/response shape used by the UI.

## Frontend

See `frontend/README.md` for a full description of the React frontend, its features, and setup instructions. In short:

- The frontend is a modern React app that displays streak cards, supports multiple usernames, and shows connection status to the backend.
- Run it with `npm start` from the `frontend` directory.

## Configuration

- `.env.example` is provided at repository root. Copy it to `.env` or provide environment variables as needed when running the Docker container or the service.

## Project structure (high level)

```
/
├── Dockerfile          # backend Dockerfile
├── pom.xml             # Maven project
├── mvnw, mvnw.cmd      # Maven wrappers
├── src/                # Java source for backend (controllers, services, models)
├── frontend/           # React frontend app (separate README)
├── .env.example        # example environment variables
└── README.md           # this file
```

If you want a more detailed file-by-file description (controllers, services and models inside `src/`), tell me and I will enumerate the key files and functions found in `src/`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Open a pull request

## License

This project is distributed under the ISC License.
