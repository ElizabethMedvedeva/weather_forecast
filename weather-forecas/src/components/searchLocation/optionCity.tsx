import { useState } from "react";
import { CityInterface } from "../../redux/reducers/APIreducer";
import { IThemeContext } from "../../theme/theme";
import { StyledOptionCitiesButton } from "./searchLocation.Styled";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

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
          <button
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={setshowFavoriteButtonFunc}
           
            style={{
              border: "none",
              // background: "transparent",
              position: "absolute",
              top: "20%",
              right: "15%",
              height: "10px",
              width: "10px",
            }}
          
         />
          
        ) : (
          <button
            key={`button-${city.id}`}
            data-id={city.id}
            onClick={setshowFavoriteButtonFunc}
            style={{
              border: "none",
              // background: "transparent",
              position: "absolute",
              background: "pink",
              height: "10px",
              width: "10px",
              top: "20%",
              right: "15%",
            }}/>
          
        
        )}
      </div>
    </>
  );
};
