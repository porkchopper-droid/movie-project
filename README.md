# 🎬 Movie Project  

A full-stack movie search application using **React (Vite) for the frontend** and **Node.js (Express) for the backend**. Fetches movie data from **OMDb API & TMDb API**.  

## 🚀 Live Demo  
🔗 **Frontend:** [porkchopper-droid.github.io/movie-project](https://porkchopper-droid.github.io/movie-project/)  
🔗 **Backend:** [Render Deployment](https://movie-project-1q1x.onrender.com)  

## 🛠 Tech Stack  
- **Frontend:** React, Vite, React Router, MUI, SCSS  
- **Backend:** Node.js, Express, Axios, CORS  
- **APIs:** OMDb API, TMDb API  

## 🔧 Setup & Run Locally  
1. Clone the repo:  
   ```sh
   git clone https://github.com/porkchopper-droid/movie-project.git
   cd movie-project
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Set up **.env** (Backend):  
   ```sh
   TMDB_API_KEY=your_tmdb_api_key
   OMDB_API_KEY=your_omdb_api_key
   ```
4. Run the backend:  
   ```sh
   npm run dev  # Runs on http://localhost:5000
   ```
5. Run the frontend:  
   ```sh
   npm run dev  # Runs on http://localhost:5173
   ```

## 🚢 Deployment  
- **Frontend:** GitHub Pages (`npm run build && npm run deploy`)  
- **Backend:** Render (`push to main triggers deploy`)  

## 📌 Features  
✅ Search movies by title  
✅ View movie details (OMDb & TMDb)  
✅ Browse movies by genre  
✅ Save favorite movies  