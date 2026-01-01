# Smart Job Tracker – Backend

A production-ready **Node.js & Express REST API** for managing job applications with secure authentication and analytics support.  
This backend powers the Smart Job Tracker frontend and is deployed on the cloud for real-world usage.

🌐 **Live API:**  
https://smart-job-tracker-backend-pah5.onrender.com

---

## 📌 About the Project

This backend application provides secure APIs for:
- User authentication
- Job application management
- Job status analytics

It is designed using a **clean MVC architecture**, follows RESTful standards, and is ready for future AI feature integration.

---

## ✨ Features

- JWT-based authentication (Register / Login)
- Secure protected routes
- Create, Read, Update, Delete (CRUD) job applications
- Job status tracking:
  - Applied
  - Interview
  - Offer
  - Rejected
- Dashboard statistics API
- Clean and scalable REST API design

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Render (Cloud Deployment)

---

## 🧱 Project Structure


backend
├── controllers # Business logic
├── routes # API routes
├── models # MongoDB schemas
├── middleware # Auth & error handling
├── config # Database configuration
└── server.js # App entry point


