# Event Management Backend Setup
Welcome to the **EventEase** backend! This README will guide you through setting up the workspace so you can start working on your assigned tasks smoothly.


## Project Overview
EventEase is a backend system for managing events, guests, check-ins, and registrations using QR codes.  
Built with **Node.js (ESM)**, **Express.js**, **MySQL**, **Sequelize ORM** and uses **Crypto** and **Swagger**.


---

## 📁 Folder Structure
/backend
│
├── config/ # Configuration files
│ ├── database.js # Sequelize DB config
│ ├── cloudStorage.js # AWS S3 setup (optional)
│ └── 
│
├── controllers/ # Handles request logic
│ ├── authController.js
│ ├── eventController.js
│ ├── guestController.js
│ └── qrController.js
│
├── middlewares/ # Custom middleware functions
│ ├── authMiddleware.js
│ ├── errorHandler.js
│ ├── rateLimiter.js
│ └── validateInput.js
│
├── migrationa
│ ├── 01-create-user.js
│ ├── 02-create-user.js
│ ├── 03-create-user.js
│ └── 04-create-user.js
│
│
├── models/ # Sequelize models
│ ├── User.js
│ ├── Event.js
│ ├── Guest.js
│ └── Schedule.js
│
├── routes/ # API routes
│ ├── authRoutes.js
│ ├── eventRoutes.js
│ ├── guestRoutes.js
│ └── qrRoutes.js
│
├── seeders
│ ├── 01-admin-user.js
│
├── utils/ # Utility functions
│ ├── generateQR.js
│ └── crypto.js
│
├── .env # Environment variables (not committed)
├── server.js # Main app entry point
├── package.json
└── README.md


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

### 1. Clone the Repository

```bash
git clone https://github.com/Ifeoluwayemisi/Eventease-Mangement-System-Capstone-Project-.git





