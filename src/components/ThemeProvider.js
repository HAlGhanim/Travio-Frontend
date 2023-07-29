import React, { useState } from "react";
import { ThemeContext } from "../context/Theme";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
