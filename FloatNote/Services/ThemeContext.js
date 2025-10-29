import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState("#2196F3"); // color por defecto

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
