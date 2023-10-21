import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { ForecastData } from "./components/dailyTemperature/dailyTemp";
import { NotFoundComponent } from "./components/empty/empty";
import { Main } from "./components/main/mainComponent";
import { SideHeader } from "./components/sideHeader/sideHeader";

import "./App.css";
import { ThemeContextProvider } from "./theme/themeContext";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Router>
        <ThemeContextProvider>
          <SideHeader />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/forecast" element={<ForecastData />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </ThemeContextProvider>
      </Router>
    </div>
  );
}

export default App;
