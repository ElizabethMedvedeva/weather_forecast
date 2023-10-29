import { ReactNode, useContext, useState } from "react";

import { Themes, themetype } from "./theme";
import { ThemeContext } from ".";

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<themetype>("light");

  const changeTheme = () => {
    const value = theme === "light" ? "dark" : "light";
    setTheme(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: ThemeContext,
        stylesForTheme: Themes[theme],
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
