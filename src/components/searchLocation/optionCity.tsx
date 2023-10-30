import { useState } from "react";

import { CityInterface } from "../../redux/reducers/reducerTypes";
import { IThemeContext } from "../../theme/theme";

import { FavoriteBtn, StyledOptionCitiesButton } from "./searchLocation.Styled";

interface IOptionCityButton {
  city: CityInterface;
  themeContext: IThemeContext;
  cityInputHandler: (event: React.MouseEvent<HTMLElement>) => void;
  favoriteInputHandler: (event: React.MouseEvent<HTMLElement>) => void;
  marked: boolean;
}

export const OptionCitiesButton = ({
  city,
  themeContext,
  cityInputHandler,
  favoriteInputHandler,
  marked,
}: IOptionCityButton) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <StyledOptionCitiesButton
          themestyles={themeContext.stylesForTheme}
          themetype={themeContext.currentTheme}
          key={city.id}
          data-id={city.id}
          onClick={cityInputHandler}
        >
          {city.name} / {city.country}
        </StyledOptionCitiesButton>
        {marked ? (
          <FavoriteBtn
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={favoriteInputHandler}
            className="icon-heart-fill"
          />
        ) : (
          <FavoriteBtn
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={favoriteInputHandler}
            className="icon-heart-stroke"
          />
        )}
      </div>
    </>
  );
};
