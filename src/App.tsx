import { General } from "./components/general/general";
import { ThemeContextProvider } from "./theme/themeContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <General />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
