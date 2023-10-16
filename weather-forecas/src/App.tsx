import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ForecastData } from "./components/dailyTemperature/dailyTemp";
import { Main } from "./components/main/mainComponent";

import "./App.css";
import { NotFoundComponent } from "./components/empty/empty";

import { SideHeader } from "./components/sideHeader/sideHeader";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <SideHeader />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/forecast" element={<ForecastData />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
