import React, { useEffect } from "react";
import "./App.css";
import Layouts from "./pages/layouts/Layouts";

function App() {
  // Apply dark mode as early as possible
  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme ? JSON.parse(savedTheme) : "dark";

    // Apply theme to document
    document.body.dataset.theme = theme;
    document.documentElement.className = theme;
  }, []);

  return (
    <div className="app-container">
      <Layouts />
    </div>
  );
}

export default App;
