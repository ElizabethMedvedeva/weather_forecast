import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { IThemeContext } from "../../theme/theme";
import { useThemeContext } from "../../theme/themeContext";
import { GeneralContainer } from "./generalStyled"
import { SideHeader } from "../sideHeader/sideHeader";
import { Main } from "../main/mainComponent";
import { ForecastData } from "../dailyTemperature/dailyTemp";
import { NotFoundComponent } from "../empty/empty";

export const General = () => {
    const themeContextData: IThemeContext = useThemeContext();
    return (
        <GeneralContainer
            themeStyles={themeContextData.stylesForTheme}
            themeType={themeContextData.currentTheme}
        >
            <Router>
                <SideHeader />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/forecast" element={<ForecastData />} />
                    <Route path="*" element={<NotFoundComponent />} />
                </Routes>
            </Router>
        </GeneralContainer>
    )
}