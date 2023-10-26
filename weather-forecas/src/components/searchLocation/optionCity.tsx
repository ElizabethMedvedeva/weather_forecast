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
  console.log(">> inside option", {
    marked: marked,
    city: city,
    name: city.name,
  });
  return (
    <>
      <StyledOptionCitiesButton
        themeStyles={themeContext.stylesForTheme}
        themeType={themeContext.currentTheme}
        key={`city-selector-${city.id}`}
        data-id={city.id}
        onClick={cityInputHanlder}
      >
        {city.name} / {city.country}
      </StyledOptionCitiesButton>
      {marked ? (
        <button
          key={`button-${city.id}`}
          data-id={city.id}
          onClick={favoriteInputHanlder}
          style={{
            backgroundColor: "black",
            width: "20px",
            height: "20px",
          }}
        />
      ) : (
        <button
          key={`button-${city.id}`}
          data-id={city.id}
          onClick={favoriteInputHanlder}
          style={{
            backgroundColor: "red",
            width: "20px",
            height: "20px",
          }}
        />
      )}
    </>
  );
};
