enum Colors {
  THUNDORA = "rgba(68, 68, 68, 0.8);",
  WHITE = "#FFFFFF",
  MINE_SHAFT = "#292727",
  COD_GRAY = "#111111",
  ALTO = "#D9D9D9",
  DEEP_GRAY = "#1D1D1D",
  SILVER = "rgba(187, 187, 187, 0.8)",
}

export type ThemeType = "light" | "dark";
export interface IThemeContext {
  currentTheme: ThemeType;
  stylesForTheme: Theme;
  changeTheme: () => void;
}

export interface Theme {
  text: Colors;
  backgroundLinear: Colors;
}

type ThemesType = Record<ThemeType, Theme>;

export const Themes: ThemesType = {
  light: {
    text: Colors.WHITE,
    backgroundLinear: Colors.THUNDORA,
  },
  dark: {
    text: Colors.MINE_SHAFT,
    backgroundLinear: Colors.SILVER,
  },
};
