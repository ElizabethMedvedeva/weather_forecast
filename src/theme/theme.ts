enum Colors {
  THUNDORA = "rgba(68, 68, 68, 0.8)",
  WHITE = "rgba(255, 255, 255, 0.7)",
  MINE_SHAFT = "rgba(41, 39, 39, 0.85)",
  COD_GRAY = "#111111",
  ALTO = "#D9D9D9",
  DEEP_GRAY = "#1D1D1D",
  SILVER = "rgba(128, 128, 128, 0.6)",
  LINEAR_DAILY_LIGHT = "B5B5B5",
  LINEAR_DAILY_DARK = "#2e2e2e",
  LINEAR_TEMPERATURE_DARK = `-webkit-linear-gradient(76deg, #eee 40%, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent`,
  LINEAR_TEMPERATURE_LIGHT = `-webkit-linear-gradient(76deg, #333 40%, #eee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent`,
  CITY_DARK = `-webkit-linear-gradient(89deg, #eee 45%, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`,
  CITY_LIGHT = `-webkit-linear-gradient(87deg, #333 45%, #eee 90% );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;`,
}
const BACKGROUND_IMAGE_LIGHT = `url("https://i.imgur.com/mfasAca.jpeg")`;
const BACKGROUND_IMAGE_DARK = `url("https://i.imgur.com/lPLmBOv.png")`;

export type themetype = "light" | "dark";
export interface IThemeContext {
  currentTheme: themetype;
  stylesForTheme: Theme;
  changeTheme: () => void;
}

export interface Theme {
  text: Colors;
  backgroundLinear: Colors;
  backgroundImage: string;
  backgroundTextLinear: Colors;
  cityText: Colors;
  backgroundButtonLinear: Colors;
}

type ThemesType = Record<themetype, Theme>;

export const Themes: ThemesType = {
  light: {
    text: Colors.MINE_SHAFT,
    backgroundLinear: Colors.SILVER,
    backgroundImage: BACKGROUND_IMAGE_LIGHT,
    backgroundTextLinear: Colors.LINEAR_TEMPERATURE_LIGHT,
    backgroundButtonLinear: Colors.LINEAR_DAILY_LIGHT,
    cityText: Colors.CITY_LIGHT,
  },
  dark: {
    text: Colors.WHITE,
    backgroundLinear: Colors.THUNDORA,
    backgroundImage: BACKGROUND_IMAGE_DARK,
    backgroundTextLinear: Colors.LINEAR_TEMPERATURE_DARK,
    backgroundButtonLinear: Colors.LINEAR_DAILY_DARK,
    cityText: Colors.LINEAR_TEMPERATURE_DARK,
  },
};
