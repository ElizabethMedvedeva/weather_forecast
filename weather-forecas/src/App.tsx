import "./App.css";
import { Clock } from "./components/clock";
import { ForecastData } from "./components/dailyTemp";
import { HourlyForecast } from "./components/hourlyForecast";
import { SearchLocation } from "./components/searchLocation";
import { TodaysHightlights } from "./components/todaysHighlights";

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
