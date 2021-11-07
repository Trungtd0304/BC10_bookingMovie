import "./App.css";

import PageNotFound from "./containers/PageNotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routerHome, routerCheckout, routerUser } from "./routes";
import { createBrowserHistory } from "history";
import Loading from "./containers/Loading/Loading";

export const history = createBrowserHistory();
function App() {
  const renderLayoutHome = (routes) => {
    return routes?.map((item, index) => {
      return (
        <Route
          history={history}
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      );
    });
  };

  return (
    <BrowserRouter>
      <Loading />
      <Switch>
        {renderLayoutHome(routerHome)}
        {renderLayoutHome(routerUser)}
        {renderLayoutHome(routerCheckout)}
        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
