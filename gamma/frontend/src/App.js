import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageInfo from "./registry";

function App() {
  return (
    <>
      <head>
        <link href="/output.css" rel="stylesheet"></link>
      </head>
      <BrowserRouter>
        <Routes>
          {PageInfo.map((page) => (
            <Route path={page.url} element={page.component} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
