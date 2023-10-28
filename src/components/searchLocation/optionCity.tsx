import { useState } from "react";
import { CityInterface } from "../../redux/reducers/APIreducer";
import { IThemeContext } from "../../theme/theme";
import {
  FavoritveBtn,
  StyledOptionCitiesButton,
} from "./searchLocation.Styled";

interface IOptionCityButton {
  city: CityInterface;
  themeContext: IThemeContext;
  cityInputHanlder: (event: any) => void;
  favoriteInputHanlder: (event: any) => void;
  marked: boolean;
}

export const OptionCitiesButton = ({
  city,
  themeContext,
  cityInputHanlder,
  favoriteInputHanlder,
  marked,
}: IOptionCityButton) => {
  const [showFavoriteButton, setshowFavoriteButton] = useState<boolean>(marked);

  const setshowFavoriteButtonFunc = (event: any) => {
    setshowFavoriteButton(!showFavoriteButton);
    favoriteInputHanlder(event);
  };

  return (
    <>
      {" "}
      <div style={{ position: "relative" }}>
        <StyledOptionCitiesButton
          themeStyles={themeContext.stylesForTheme}
          themeType={themeContext.currentTheme}
          key={city.id}
          data-id={city.id}
          onClick={cityInputHanlder}
        >
          {city.name} / {city.country}
        </StyledOptionCitiesButton>
        {showFavoriteButton ? (
          <FavoritveBtn
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={setshowFavoriteButtonFunc}
            className="icon-heart-fill"
          />
        ) : (
          <FavoritveBtn
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={setshowFavoriteButtonFunc}
            className="icon-heart-stroke"
          />
        )}
      </div>
    </>
  );
};
