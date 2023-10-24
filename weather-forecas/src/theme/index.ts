import React, { Context } from "react";
import { Theme, ThemeType, Themes } from "./theme";
export interface IThemeContext {
  currentTheme: Context<IThemeContext>;
  stylesForTheme: Theme;
  changeTheme: () => void;
}
export const ThemeContext = React.createContext<IThemeContext>(
  {} as IThemeContext
);
