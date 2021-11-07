import "./App.css";
import { createBrowserHistory } from "history";
import { Router } from "react-router";
import { HomeTemplate } from "./containers/HomeTemplate";
import Home from "./containers/HomeTemplate/HomePage";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <HomeTemplate path="/" exact Component={Home} />
    </Router>
  );
}

export default App;
