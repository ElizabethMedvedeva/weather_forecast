import React, { useContext, useState } from "react";
import { ThemeContext } from ".";
import { Themes } from "./theme";
type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  changeTheme: () => void;
};

export const ThemeContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  // const themeContextValue: ThemeContextType = {
  //   theme,
  //   changeTheme,
  // };
  return (
    <ThemeContext.Provider
      value={{ currentTheme: ThemeContext, stylesForTheme: Themes[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
