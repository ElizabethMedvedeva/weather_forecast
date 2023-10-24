import { ThemeContextProvider } from "./theme/themeContext";
import { General } from "./components/general/general";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <ThemeContextProvider>
        <General />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
