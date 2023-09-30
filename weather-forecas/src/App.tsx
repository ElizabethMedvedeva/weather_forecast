import "./App.css";
import { ForecastData } from "./components/dailyTemp";
import { HourlyForecast } from "./components/hourlyForecast";
import { TodaysHightlights } from "./components/todaysHighlights";

function App() {
  return (
    <div className="App">
      <ForecastData />
      <TodaysHightlights/>
      <HourlyForecast/>
    </div>
  );
}

export default App;
