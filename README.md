# EventEase Backend (Workspace Setup)

This is the backend workspace for the EventEase event management system, built with Node.js, Express.js, Sequelize, and MySQL.

---

## 📁 Folder Structure
eventease-backend/
├── config/
│ └── database.js  # Database connection setup using Sequelize
│
├── controllers/
│ ├── authController.js  # User authentication logic
│ ├── eventController.js  # Event creation and management logic
│ └── guestController.js  # Guest management logic
│  
├── middlewares/
│ ├── authMiddleware.js  # JWT authentication middleware
│ └── errorMiddleware.js  # Error handling middleware
│
├── models/
│ ├── User.js # Sequelize User model
│ ├── Event.js # Sequelize Event model
│ ├── Guest.js # Sequelize Guest model
│ └── index.js # Model associations and exports
│
├── routes/
│ ├── authRoutes.js # Routes for authentication (login, register)
│ ├── eventRoutes.js # Routes for event endpoints
│ └── guestRoutes.js # Routes for guest endpoints
│
├── .env  # Environment variables (not committed to git)
├── server.js  # Entry point, sets up Express server
├── package.json  # Project dependencies and scripts
└── README.md  # Project documentation and setup guide


