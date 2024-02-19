import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import RedirectPage from "./pages/Redirect";
import Page404 from "./pages/Page404";
import Status from "./Status";
import ProfileEdit from "./pages/ProfileEdit";

const PageInfo = [
  {
    url: "/home",
    component: <Home />,
  },
  {
    url: "/:nameHandle",
    component: <Profile />,
  },
  {
    url: "/login",
    component: <Login />,
  },
  {
    url: "/status/:statusID",
    component: <Status />,
  },
  {
    url: "/edit/:userID",
    component: <ProfileEdit />,
  },
  {
    url: "",
    component: <RedirectPage targetPage="home" />,
  },
  {
    url: "*",
    component: <Page404 />,
  },
];

export default PageInfo;
