import { useState } from "react";
import { CityInterface } from "../../redux/reducers/APIreducer";
import { IThemeContext } from "../../theme/theme";
import { StyledOptionCitiesButton } from "./searchLocation.Styled";

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
  const [showFavotieButton, setshowFavotieButton] = useState<boolean>(true);

  const setshowFavotieButtonFunc = () => {
    if (showFavotieButton === true) {
      setshowFavotieButton(false);
    }
    if (showFavotieButton === false) {
      setshowFavotieButton(true);
    }
  };
  console.log(showFavotieButton, "TESTSTATE");
  return (
    <>
      <StyledOptionCitiesButton
        themeStyles={themeContext.stylesForTheme}
        themeType={themeContext.currentTheme}
        key={city.id}
        data-id={city.id}
        onClick={cityInputHanlder}
      >
        {city.name} / {city.country}
      </StyledOptionCitiesButton>

      <button
        key={`button-${city.id}`}
        data-id={city.id}
        onClick={() => {
          favoriteInputHanlder();
          setshowFavotieButtonFunc();
        }}
        style={{
          display: showFavotieButton ? "none" : "flex",
          backgroundColor: marked ? "red" : "white",
          width: "20px",
          height: "20px",
        }}
      />
      <button
        key={`button-${city.id}`}
        data-id={city.id}
        onClick={favoriteInputHanlder}
        style={{
          display: !showFavotieButton ? "none" : "flex",
          backgroundColor: marked ? "red" : "white",
          width: "20px",
          height: "20px",
        }}
      />
    </>
  );
};
