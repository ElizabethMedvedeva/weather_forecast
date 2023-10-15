import { ForecastData } from "./components/dailyTemperature/dailyTemp";
import { HourlyForecast } from "./components/hourlyForecast/hourlyForecast";
import { SearchLocation } from "./components/searchLocation/searchLocation";
import { TodaysHightlights } from "./components/todaysHiglights/todaysHighlights";

import "./App.css";

function App() {
  return (
    <div className="App">
      <SearchLocation />
      <HourlyForecast />
      <ForecastData />
      <TodaysHightlights />
    </div>
  );
}

export default App;
