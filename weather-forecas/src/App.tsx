import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ForecastData } from "./components/dailyTemperature/dailyTemp";
import { Main } from "./components/main/mainComponent";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Main />
      <ForecastData />
    </div>
  );
}

export default App;
