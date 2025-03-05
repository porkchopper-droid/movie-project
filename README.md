# Movie Project

## 📌 Overview

A **React-based movie app** using OMDb & TMDB APIs to browse, search, and save favorite movies.

## 🛠️ Technologies Used

- **React** ⚛️ (Component-based UI)
- **React Router** 🚀 (Navigation)
- **SCSS** 🎨 (Styling)
- **Material UI** 🎭 (Pagination)
- **Vite** ⚡ (Development server)

## ⚙️ Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/movie-project.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the dev server:
   ```sh
   npm run dev
   ```
   Access at: `http://localhost:5173/movie-project/`

## 🔥 Features

- **Movie browsing & search** 🎬
- **Genre-based filtering** 🗂️
- **Detailed movie info** 📝
- **Favorites list** ❤️
- **Pagination support** 📑

## 🚀 Deployment

Set `base` in `vite.config.js`:

```js
export default defineConfig({
  base: "/movie-project/",
  plugins: [react()],
});
```

Deploy using:

```sh
npm run build
npm run deploy
```

## 🛠️ API Usage

Add API keys in `SearchContext.jsx`:

```jsx
const OMDB_APIkey = "your-omdb-api-key";
const TMDB_APIkey = "your-tmdb-api-key";
```

## 👨‍💻 Author

**Dmytro Kuzyk** – *Junior Web Developer*
in collaboration with Ahmad Al Sayed and Avdyl Zekaj – *Junior Web Developer*

- GitHub: [porkchopper-droid](https://github.com/porkchopper-droid)
- LinkedIn: https\://www\.linkedin.com/in/dmytro-kuzyk/

🚀 **Enjoy your movie browsing!** 🎬🍿