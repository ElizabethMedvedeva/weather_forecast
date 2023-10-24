import nightSky from "./dark_sky.png"

enum Colors {
  THUNDORA = "rgba(68, 68, 68, 0.8);",
  WHITE = "#FFFFFF",
  MINE_SHAFT = "#292727",
  COD_GRAY = "#111111",
  ALTO = "#D9D9D9",
  DEEP_GRAY = "#1D1D1D",
  SILVER = "rgba(128, 128, 128, 0.6)",
  }
const BACKGROUND_IMAGE_LIGHT = `url("https://i.imgur.com/mfasAca.jpeg")`;
const BACKGROUND_IMAGE_DARK =`url("https://i.imgur.com/lPLmBOv.png")`;


export type ThemeType = "light" | "dark";
export interface IThemeContext {
  currentTheme: ThemeType;
  stylesForTheme: Theme;
  changeTheme: () => void;
}

export interface Theme {
  text: Colors;
  backgroundLinear: Colors;
  backgroundImage: string;
}

type ThemesType = Record<ThemeType, Theme>;

export const Themes: ThemesType = {
  light: {
    text: Colors.MINE_SHAFT,
    backgroundLinear: Colors.SILVER,
    backgroundImage: BACKGROUND_IMAGE_LIGHT,
  },
  dark: {
    text: Colors.WHITE,
    backgroundLinear: Colors.THUNDORA,
    backgroundImage: BACKGROUND_IMAGE_DARK,
  },
};
