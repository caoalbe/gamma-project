import Home from "./pages/Home";
import Page2 from "./pages/Page2";
import Page404 from "./pages/Page404";

const PageInfo = [
  {
    url: "",
    component: <Home />,
  },
  {
    url: "/page2",
    component: <Page2 />,
  },
  {
    url: "*",
    component: <Page404 />,
  },
];

export default PageInfo;
