import React, { useContext, useState } from "react";
// import { ThemeType } from "./theme";
type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  changeTheme: () => void;
};
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "light",
  changeTheme: () => {},
});
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

  const themeContextValue: ThemeContextType = {
    theme,
    changeTheme,
  };
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
