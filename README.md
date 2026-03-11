# 🏦 Account Ledger System

A backend system that simulates a **banking-style ledger architecture** for managing accounts and transactions.  
This project focuses on **secure financial record management**, **atomic transactions**, and **ledger-based balance tracking**.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- User Logout
- JWT-based authentication
- Cookie-based session management
- Token blacklist system for secure logout

---

### 👤 Account Management
- Create user accounts
- Multiple accounts per user
- Account status management:
  - ACTIVE
  - FROZEN
  - CLOSED

---

### 📊 Ledger-Based Accounting
Instead of storing balance directly, the system calculates balance using **ledger entries**.

Ledger entries include:
- **DEBIT**
- **CREDIT**

This follows **real banking system architecture** where balance is derived from transactions.

---

### 💸 Transaction System

Users can transfer funds between accounts.

Features include:

- Account validation
- Balance validation
- Account status verification
- Idempotent transactions (prevents duplicate payments)

---

### 🔁 Idempotency

Each transaction uses an **idempotency key** to prevent duplicate processing.

This ensures:
- Safe retries
- Duplicate payment protection

---

### 🔄 Atomic Transactions (MongoDB Sessions)

Transactions are executed using **MongoDB sessions** to ensure atomicity.

Steps:

1. Create transaction (PENDING)
2. Create debit ledger entry
3. Create credit ledger entry
4. Mark transaction as COMPLETED

If any step fails → the transaction is rolled back.

---

### 📧 Email Notifications

Email notifications are sent for:

- User Registration
- Successful Transactions
- Failed Transactions

Implemented using **Nodemailer with OAuth2 authentication**.

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **bcryptjs**
- **Nodemailer**
- **MongoDB Transactions (Sessions)**

---

## 🔒 Security Features

- Password hashing using **bcrypt**
- JWT authentication
- Cookie-based sessions
- Token blacklist system
- Idempotent transactions
- Account status validation

---

## 🎯 Key Learning Concepts

This project demonstrates:

- Ledger based accounting systems
- Financial transaction integrity
- Idempotency patterns
- MongoDB transactions
- Secure authentication systems
- Backend architecture design

---

## 📌 Future Improvements

- Transaction history API
- Account freeze/unfreeze API
- Admin dashboard
- Rate limiting
- Frontend dashboard (React)

---

## 👨‍💻 Author

**Tauseef Ahmad**
