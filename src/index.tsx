import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { reduxStore} from "./redux/store";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
