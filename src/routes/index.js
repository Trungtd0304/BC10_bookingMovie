import AboutPage from "../containers/HomeTemplate/AboutPage";
import HomePage from "../containers/HomeTemplate/HomePage";
import Detail from "../containers/HomeTemplate/Detail";
import Register from "../containers/Register/Register";
import New from "../containers/HomeTemplate/New";
import CheckoutTeamplate from "../containers/CheckoutTemplate";
import UserTeamplate from "../containers/Register";
import Profile from "../containers/Register/Profile";

const routerHome = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  { path: "/about", exact: false, component: AboutPage },
  { path: "/new", exact: false, component: New },
  { path: "/detail/:id", exact: false, component: Detail },
  { path: "/register", exact: false, component: Register },
  { path: "/profile", exact: false, component: Profile },
];
const routerUser = [
  {
    path: "/login",
    exact: false,
    component: UserTeamplate,
  },
];
const routerCheckout = [
  {
    path: "/checkout/:id",
    exact: false,
    component: CheckoutTeamplate,
  },
];
const routerAdmin = [];

export { routerHome, routerCheckout, routerAdmin, routerUser };
