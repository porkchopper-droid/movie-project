import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SearchContextProvider from "./contexts/SearchContext";
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    
  
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
    </BrowserRouter>
  </StrictMode>
)
