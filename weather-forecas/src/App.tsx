import "./App.css";
import { ForecastData } from "./components/dailyTemp";
import { HourlyForecast } from "./components/hourlyForecast";
import { SearchLocation } from "./components/searchLocation";
import { TodaysHightlights } from "./components/todaysHighlights";

function App() {
  return (
    <div className="App">
      <SearchLocation />
      <ForecastData />
      <TodaysHightlights />
      <HourlyForecast />
    </div>
  );
}

export default App;
