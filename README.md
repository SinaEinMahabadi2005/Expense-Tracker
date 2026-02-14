# 💰 Personal Finance Manager (Expense Tracker Pro)

A full-stack personal finance management application built with **Node.js, Express, MongoDB, and React**.

This application allows users to track income and expenses, manage monthly budgets, and analyze financial data through powerful dashboards and reports.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT Authentication
- Refresh Token System
- Role-Based Access (User / Admin)
- Secure password hashing (bcrypt)
- Protected Routes

---

### 💸 Transactions Management
- Create / Update / Delete transactions
- Income & Expense tracking
- Category-based organization
- Date range filtering
- Pagination & sorting
- Search functionality

---

### 📂 Categories
- Custom categories per user
- Income / Expense type validation
- Icon & color customization
- Category-based reporting

---

### 💰 Budget System (Advanced)
- Monthly global budget
- Category-specific budgets
- Budget vs actual spending comparison
- Overspending detection
- Percentage usage calculation

---

### 📊 Dashboard & Reports
- Total income (monthly / yearly)
- Total expenses (monthly / yearly)
- Current balance
- Expense breakdown by category
- Monthly financial trends
- Budget progress visualization
- Aggregation-based analytics (MongoDB)

---

## 🧠 Architecture Overview

### Backend (Node.js + Express)
- Modular feature-based architecture
- Service Layer pattern
- Global error handling
- MongoDB Aggregation pipelines
- Indexed queries for performance
- Validation layer (Joi / Zod)
- Security middleware (Helmet, Rate limiting)

---

### Frontend (React)
- React Router
- State management (Redux Toolkit / Zustand)
- Axios with interceptors
- Reusable hooks
- Protected routes
- Chart visualization (Recharts / Chart.js)
- Dark mode support

---

## 🗂 Database Models

### 👤 User
- name
- email (unique)
- password (hashed)
- role
- isActive
- timestamps

---

### 📂 Category
- name
- type (income | expense)
- icon
- color
- userId
- timestamps

---

### 💸 Transaction
- title
- amount
- type (income | expense)
- categoryId
- userId
- date
- note
- timestamps
- indexed fields for performance

---

### 💰 Budget
- amount
- month
- year
- categoryId (optional)
- userId
- unique constraint per month/category

---

## ⚙️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi / Zod
- Morgan
- Helmet

### Frontend
- React
- Vite
- React Router
- Redux Toolkit / Zustand
- Axios
- Recharts / Chart.js
- TailwindCSS / MUI

---

## 📈 Advanced MongoDB Usage

- $match
- $group
- $sum
- $project
- $sort
- Date-based filtering
- Compound indexes
- Aggregation for dashboard analytics

---

## 🛡 Security Practices

- Password hashing
- JWT expiration handling
- Refresh token rotation
- Input validation
- Sanitized database queries
- Rate limiting

---

## 📦 Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
