# 🌍 Air Quality Impact & Respiratory Disease — React App

An interactive data-driven web application that visualizes **air pollution impact on respiratory health** using maps, ML insights, and analytics dashboards.

Built with **React, Leaflet, and Chart.js**, this project demonstrates real-world usage of **environmental data + machine learning visualization**.

---

## 🚀 Features

* 📊 **Pollution Dashboard** — Visual pollutant indicators & statistics
* 🗺️ **Live AQI Maps** — Air Quality + Climate data using APIs
* 📈 **ML Insights (EDA)** — Heatmaps, histograms, time-series, scatter plots
* 🤖 **Algorithm Showcase** — ML models with accuracy comparisons
* 👥 **Team Section** — Project contributors & guide
* 📢 **Call-to-Action Section** — Engagement & awareness

---

## 🧠 Tech Stack

* ⚛️ React (Frontend)
* 🗺️ Leaflet + React-Leaflet (Maps)
* 📊 Chart.js + react-chartjs-2 (Data Visualization)
* 🎯 Intersection Observer (Scroll animations)

---

## 📁 Project Structure

```
src/
├── App.jsx
├── index.js
├── styles/
│   └── global.css
└── components/
    ├── NavDots.jsx
    ├── Slide1Hero.jsx
    ├── 2Prediction.jsx
    ├── 3Map.jsx
    ├── 4Algorithms.jsx
    ├── 5Team.jsx
    └── 6CTA.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd air-quality-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

---

## 📦 Dependencies

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "chart.js": "^4.4.1",
  "react-chartjs-2": "^5.2.0",
  "react-intersection-observer": "^9.5.3"
}
```

---

## 🔑 API Configuration (Important)

This project uses the **OpenWeatherMap API** for real-time air quality and weather data.

### 👉 Steps:

1. Get your free API key from:
   https://openweathermap.org/api

2. Open:

```
src/components/Slide2Maps.jsx
```

3. Replace:

```js
const OWM_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

---

### ⚠️ Note

* Without an API key, the app runs in **demo mode** using static Mumbai data.
* Do NOT expose your API key in public repositories.

---

## 🎨 Customization Guide

| Feature         | File Location                          |
| --------------- | -------------------------------------- |
| College / Guide | `5Team.jsx`                            |
| Team Members    | `5Team.jsx`            → `TEAM` array  |
| ML Algorithms   | `4Algorithms.jsx`      → `ALGOS` array |
| Pollutants Data | `Hero.jsx`       → `pollutants` array  |
| Statistics      | `Hero.jsx`            → `stats` array  |
| Theme / Colors  | `styles/global.css`                    |

---

## 🧪 Use Case

This project demonstrates:

* Environmental data visualization
* Real-world API integration
* ML concept presentation (EDA + model comparison)
* Interactive UI/UX design

Perfect for:

* AI/ML portfolios
* Hackathons
* College projects
* Internship applications

---

## 📸 Future Improvements

* 🔮 Add real-time ML prediction model
* 📡 Backend integration (Flask / FastAPI)
* 🧠 Personalized health risk prediction
* 📊 Historical AQI trend analysis

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 💡 Author

**Avneesh Chaurasia**
Aspiring AI/ML Engineer 🚀

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub and share!

---