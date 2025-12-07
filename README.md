
# 🩸 Life Saver – Blood Donation Management System

**Life Saver** is a web-based application designed to connect **blood donors** with **recipients**, as well as link **blood banks, hospitals, and donation camps** on a single platform. The goal is to make blood availability faster, smarter, and more accessible in emergency situations.

This project is developed using **React** for the frontend and **Spring Boot** for the backend, with plans to integrate **Maps** for nearby blood bank and donor location tracking.

---

## 🚀 Features

### 👤 User Roles

* **Donor**
* **Recipient**
* **Hospital / Blood Bank**
* **Admin**

### ✅ Main Functionalities

#### 🩸 Donor Module

* Register as a blood donor
* Add blood group, location & availability
* Update or delete profile
* See nearby requests

#### 🧍 Recipient Module

* Create blood requests with required blood group & location
* View matching donors
* Contact donors or hospitals

#### 🏥 Hospital / Blood Bank Module

* Manage blood stock info
* View nearby donors
* Update availability

#### 📍 Maps Integration (Planned)

* Show nearby blood banks & donors on map
* Use GPS/location-based search

#### 🧑‍💻 Admin Panel

* Approve or reject registrations
* Manage users
* Monitor requests and donations

---

## 🛠️ Technologies Used

### Frontend

* React.js
* HTML / CSS / JavaScript
* Axios (for API calls)

### Backend

* Spring Boot
* REST APIs
* JWT Authentication
* Maven

### Database

* MySQL / PostgreSQL

### Other Tools

* Git & GitHub
* Postman
* Google Maps API (planned)

---

## 🗂️ Project Structure

```
LifeSaver/
│
├── frontend/        → React application
│
├── backend/         → Spring Boot application
│
├── database/        → SQL files
│
└── README.md
```

---

## 🔐 Security Features

* Encrypted passwords
* JWT based authentication
* Role-based access (Donor, Recipient, Admin)
* Input validation & data sanitization

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/LifeSaver.git
```

---

### 2. Backend Setup (Spring Boot)

```
cd backend
open in IntelliJ / Eclipse
Run the Application.java file
```

Update `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/lifesaver
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

### 3. Frontend Setup (React)

```
cd frontend
npm install
npm start
```

Frontend runs on:

```
http://localhost:3000
```

Backend runs on:

```
http://localhost:8080
```

---

## 📸 Screens (To be added)

* Login page
* Register page
* Donor dashboard
* Blood request page
* Map view

---

## 🎯 Future Enhancements

* ✅ Real-time chat between donor & patient
* ✅ AI-based donor recommendation
* ✅ Emergency one-click alert system
* ✅ Mobile App using React Native
* ✅ SMS / Email notifications

---

## 👨‍💻 Developer

**Mahesh (B.Tech – Information Technology)**
Gayatri Vidya Parishad College of Engineering, Visakhapatnam
Skills: React | Spring Boot | Java | MySQL | REST APIs

---

## ❤️ Mission

> "No one should die due to the unavailability of blood."

Life Saver is built to support emergency situations and create a smart, connected network of life savers.
