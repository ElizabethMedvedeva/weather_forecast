import "./App.css";
import { ForecastData } from "./components/dailyTemp";
import { TodaysHightlights } from "./components/todaysHighlights";

function App() {
  return (
    <div className="App">
      <ForecastData />
      <TodaysHightlights/>
    </div>
  );
}

export default App;
