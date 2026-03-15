Job Application Tracker (Dockerized)

A containerized Job Application Tracking System built using Spring Boot, Docker, and PostgreSQL.
This project demonstrates a simple 3-tier architecture where users can manage job applications and track their status.

Project Overview

The Job Tracker application helps users manage and track their job applications in one place.
Users can add, update, view, and delete job applications along with their current status.

This project also demonstrates DevOps concepts such as containerization, multi-container orchestration, and service communication using Docker Compose.

Architecture

3-Tier Architecture

Frontend
HTML / CSS / JavaScript

Backend
Spring Boot REST API

Database
PostgreSQL

Docker is used to containerize the backend and database services, while Docker Compose orchestrates the entire application.

Tech Stack

Backend
Spring Boot
Java
Spring Data JPA

Frontend
HTML
CSS
JavaScript

Database
PostgreSQL

DevOps Tools
Docker
Docker Compose

Features

Add new job applications
View all job applications
Update application status
Delete job applications
Track job progress (Applied, Interview, Offer, Rejected)

Project Structure
Jobtracker
│
├── src
│   └── main
│       ├── java/com/jobtracker
│       │   ├── controller
│       │   ├── model
│       │   ├── repository
│       │   └── JobtrackerApplication.java
│       │
│       └── resources
│           ├── static
│           │   ├── index.html
│           │   ├── script.js
│           │   └── style.css
│           │
│           └── application.properties
│
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
Running the Project with Docker
1 Clone the repository
git clone https://github.com/Tanuja-chennurkar/Jobtracker.git
cd Jobtracker
2 Build and run containers
docker compose up --build
3 Access the application

Open in browser

http://localhost:8080
API Endpoints

GET
/api/jobs → Get all jobs

POST
/api/jobs → Add a new job

PUT
/api/jobs/{id} → Update job

DELETE
/api/jobs/{id} → Delete job

DevOps Concepts Demonstrated

Containerization using Docker
Multi-container orchestration with Docker Compose
Service networking between containers
Persistent database storage using volumes

Future Improvements

User authentication
Application filtering and search
Deployment on cloud (AWS / Render / Kubernetes)

Author

Tanuja Chennurkar

BTech Student | Machine Learning & DevOps Enthusiast
