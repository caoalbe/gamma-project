import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const PageInfo = [
  {
    url: "/:userID",
    component: <Profile />,
  },
  {
    url: "/home",
    component: <Home />,
  },
  {
    url: "/login",
    component: <Login />,
  },
  {
    url: "*",
    component: <Page404 />,
  },
];

export default PageInfo;
