# yumilk-v2-server

Rebuild YUMILK BE MVP for practice.

# YUMILK V2 - E-commerce Backend API

> A robust RESTful API built for the YUMILK V2 e-commerce platform. This project implements a strict 3-tier Layered Architecture (Router-Controller-Service) to ensure high scalability, separation of concerns, and code maintainability.

## Tech Stack

- **Core:** Node.js, Express.js, TypeScript
- **Database:** MongoDB, Mongoose
- **Security & Auth:** JWT (JSON Web Tokens), bcrypt

## Architecture & Folder Structure

This API strictly follows the Layered Architecture pattern:

- `src/routes/`: Defines API endpoints and routes incoming requests.
- `src/controllers/`: Handles HTTP requests/responses and extracts user input.
- `src/services/`: Contains the core business logic and interacts directly with the database.
- `src/models/`: Defines Mongoose schemas and data structures.
