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
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/forecast" element={<ForecastData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
