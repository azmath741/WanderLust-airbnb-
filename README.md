# 🌍 Wanderlust (Airbnb Clone)

A full-stack web application inspired by **Airbnb**, built using **Node.js**, **Express**, and **MongoDB**. Wanderlust allows users to create, browse, and book travel stays with secure authentication, image uploads, and responsive templates.

---

## 📑 Table of Contents
- [Introduction](#-introduction)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Configuration](#-configuration)  
- [Usage](#-usage)  
- [Examples](#-examples)  
- [Troubleshooting](#-troubleshooting)  
- [Contributors](#-contributors)  
- [License](#-license)  

---

## 🚀 Introduction
Wanderlust is a clone of Airbnb designed for learning and portfolio purposes. It allows users to **sign up, log in, create listings, upload images, leave reviews, and manage stays**. The app integrates **Cloudinary** for image storage and uses **Passport.js** for authentication.  

---

## ✨ Features
- 🔐 User authentication & session handling (Passport.js + express-session)  
- 🏡 Create, edit, and delete listings  
- 🖼️ Image upload & storage with **Multer + Cloudinary**  
- 📝 Leave reviews on listings  
- 📂 MongoDB database with Mongoose schemas  
- ✅ Server-side validation with Joi  
- ⚡ Flash messages for better UX  
- 📄 EJS templates with **ejs-mate** layouts  
- 🔄 Method override for RESTful routes  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Frontend:** EJS, ejs-mate  
- **Database:** MongoDB with Mongoose  
- **Authentication:** Passport.js, passport-local-mongoose  
- **File Storage:** Multer + Cloudinary  
- **Validation:** Joi  
- **Session Storage:** connect-mongo  

---

## 💻 Installation

- Clone the repository:  
   ```bash
   git clone https://github.com/azmath741/WanderLust-airbnb-.git
   cd wanderlust
- Install dependencies:
  npm install
- Make sure you have MongoDB running locally or use a MongoDB Atlas cluster.
- ##⚙️ Configuration
  Create a .env file in the root directory and add the following:

     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_KEY=your_cloudinary_api_key
     CLOUDINARY_SECRET=your_cloudinary_api_secret
     MONGO_URI=your_mongo_database_url
     SESSION_SECRET=your_session_secret
## ▶️ Usage

- Start the development server:  npm start
- Navigate to:http://localhost:8080

## 📸 Examples
1.Homepage: Browse listings

2.Listing Page: View details, images, and reviews

3.Authentication: Register & login/logout

4.Dashboard: Manage your listings

## 🛠️ Troubleshooting

1.MongoDB not connecting?
Check that your MONGO_URI in .env is correct.

2.Images not uploading?
Ensure your Cloudinary credentials are valid and the cloudinary package is configured correctly.

3.Session issues?
Confirm your SESSION_SECRET is set and connect-mongo is connected to your database.

## 👥 Contributors
**.**Mohammed Azmath Ali

## 📜 License

This project is licensed under the MIT License.
