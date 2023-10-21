import React, { useContext, useState } from "react";
import { ThemeType } from "./theme";

export const ThemeContext = React.createContext({});
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

  return (
    <ThemeContext.Provider
      value={{ theme: theme, changeTheme: () => changeTheme() }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
