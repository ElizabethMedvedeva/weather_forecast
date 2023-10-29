import { useContext, useState } from "react";
import { ThemeContext } from ".";
import { themetype, Themes } from "./theme";

export const ThemeContextProvider = ({ children }: any) => {
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
