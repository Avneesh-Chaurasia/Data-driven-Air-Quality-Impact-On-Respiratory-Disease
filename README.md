# 🌍 Data-Driven Analysis of Air Quality Impact on Respiratory Disease

## 📌 Overview

This project focuses on analyzing how air quality affects respiratory diseases using a data-driven approach. It combines data analysis, machine learning, and visualization to understand patterns between environmental pollutants and health outcomes.

The system allows users to explore air quality data, understand its impact, and make predictions using trained models.

---

## 🚀 Features

* 🔐 User Authentication (Login & Signup)
* 📊 Air Quality Data Analysis
* 🤖 Machine Learning-based Prediction
* 🗺️ Interactive Map Visualization
* 📈 Data-driven Insights & Trends
* 🎯 Clean and Responsive UI

---

## 🏗️ Tech Stack

### Frontend:

* React.js
* HTML, CSS

### Backend:

* Python (Flask)

### Database:

* SQLite

### Machine Learning:

* Regression Algorithms (Scikit-learn)

---

## 📂 Project Structure

```
AQI Project/
│
├── Backend/
│   ├── auth.py
│   ├── users.db
│   ├── aqi_data.db
│   └── instance/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Avneesh-Chaurasia/Data-driven-Air-Quality-Impact-On-Respiratory-Disease.git
cd Data-driven-Air-Quality-Impact-On-Respiratory-Disease
```

---

### 2️⃣ Backend Setup

```
cd Backend
pip install -r requirements.txt
python app.py
```

---

### 3️⃣ Frontend Setup

```
cd Frontend
npm install
npm start
```

---

## 📊 How It Works

1. User logs into the system
2. Air quality data is processed and analyzed
3. Machine learning model predicts respiratory disease impact
4. Results are visualized through UI components and maps

---

## 📸 Screenshots

(Add your project screenshots here)

---

## 🔒 Environment Variables

Create a `.env` file in the Frontend directory and add:

```
REACT_APP_API_URL=your_backend_url
```

⚠️ Do not upload `.env` files to GitHub.

---

## 📦 Dependency Management Guide

To ensure a clean and efficient development workflow, this project follows best practices for managing Python dependencies.

### ⚠️ Common Mistake

Using:

```
pip freeze > requirements.txt
```

This command captures **all installed packages** in your environment, including unnecessary ones from other projects.

---

### ✅ Recommended Approach

#### 1️⃣ Create a Virtual Environment

```
python -m venv venv
source venv/bin/activate   # Linux / Mac
```

---

#### 2️⃣ Install Only Required Packages

```
pip install flask flask-cors flask-sqlalchemy flask-bcrypt pandas scikit-learn python-dotenv
```

---

#### 3️⃣ Generate Clean Requirements File

##### 🔹 Basic Method

```
pip freeze > requirements.txt
```

##### 🔹 Better Method (Recommended)

```
pip install pipreqs
pipreqs .
```

---

### 🚫 Files to Exclude from Git

Add the following to your `.gitignore`:

```
.env
*.db
venv/
node_modules/
__pycache__/
```

---

### 🧠 Best Practices

* Use a separate virtual environment for each project
* Avoid unnecessary dependencies
* Keep `requirements.txt` minimal and clean
* Never upload sensitive files like `.env`

---

## 🧠 Future Improvements

* Deploy the project (AWS / Render / Vercel)
* Add real-time AQI API integration
* Improve ML model accuracy
* Add more health datasets
* Enhance UI/UX

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Avneesh Chaurasia**

* GitHub: https://github.com/Avneesh-Chaurasia

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
