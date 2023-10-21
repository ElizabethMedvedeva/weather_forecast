import React, { useContext, useState } from "react";

export const ThemeContext = React.createContext({});
export const ThemeContextProvider = ({ children }: any) => {
  type ThemeType = "Light" | "Dark";
  const [theme, setTheme] = useState<ThemeType>("Light");

  const changeTheme = () => {
    if (theme === "Dark") {
      setTheme("Light");
    }
    if (theme === "Light") {
      setTheme("Dark");
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
