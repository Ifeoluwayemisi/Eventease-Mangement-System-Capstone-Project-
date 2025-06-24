# Event Management Backend Setup
Welcome to the **EventEase** backend! This is a robust Node.js/Express.js backend (ESM-based) designed to manage events, guest lists, and more, built with MySQL, Postman, and Django email integration. Let’s dive into what this project is about and how it’s structured! 🚀


## Project Overview
**Purpose**
This backend powers an event management system, enabling organizers to create events, manage guest lists, generate secure QR codes (using HMAC-SHA256 and Crypto), schedule events, register users, and send email notifications via Django

**Key Features**

* User Registration & Login: Register new users and authenticate them.
* Event Management: Create and schedule events.
* Guest List Management: Track guests with secure QR codes.
* QR Code Generation/Validation: Generate QR codes with HMAC-SHA256 and a linked list for integrity, validated     during check-in.
* Email Notifications: Send registration and alert emails using Django.
* API-Driven: Built with Express.js, tested via Postman.

---

**Getting Started**

**Prerequisites**: Node.js 18+, MySQL, Git, Postman (optional), AWS account (for S3).
**Setup Guide**: See docs/Setup_Guide.md (to be added) for detailed steps.


## 📁 Folder Structure
event-management-backend/
├── backend/              # Main backend application folder
│   ├── src/             # Source code
│   │   ├── controllers/ # API logic (e.g., user.js, event.js, guest.js)
│   │   ├── models/      # Sequelize models (e.g., User.js, Event.js, Guest.js)
│   │   ├── routes/      # Express routes (e.g., auth.js, events.js, guests.js)
│   │   ├── services/    # Utility functions (e.g., qr.js for QR generation)
│   │   ├── middleware/  # Middleware (e.g., auth.js, validator.js)
│   │   ├── config/      # Configuration files (e.g., env.js)
│   │   ├── server.js     # Entry point
│   ├── docs/            # Documentation
│   │   ├── Backend_Tasks.docx  # Task assignments
│   │   ├── swagger.yaml       # API documentation
│   │   ├── postman_collection.json # Postman config
│   ├── tests/           # Test files
│   │   ├── unit/        # Unit tests (e.g., event.test.js)
│   │   ├── integration/ # Integration tests (e.g., api.test.js)
│   ├── migrations/      # Sequelize database migrations
│   ├── seeders/         # Seed data (e.g., admin-user.js)
│   ├── package.json     # Node.js dependencies and scripts
│   ├── package-lock.json # Dependency lock file
│   ├── .env.example     # Environment variable template
│   └── .gitignore       # Git ignore rules
├── README.md            # This file (project overview)
└── 

---

## 🧰 Tech Stack

- Node.js (ESM)
- Express.js
- MySQL + Sequelize
- JWT Auth
- Nodemailer
- Crypto (Node built-in)
- Swagger (swagger-ui-express, yamljs)
- dotenv
- Postman (for testing)
- Jest + Supertest (testing)

---

## ✅ Setup Instructions

### API DOCUMENTATION

You can view the full API documentation on postman by clicking the link below:
[View API Docs on Postman](https://documenter.getpostman.com/view/44828221/2sB2xBDVmn)

### 1. Clone the Repository

```bash
git clone https://github.com/Ifeoluwayemisi/Eventease-Mangement-System-Capstone-Project-.git



