import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageInfo from "./registry";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <head>
        <link href="/output.css" rel="stylesheet"></link>
      </head>
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <Routes>
            {PageInfo.map((page) => (
              <Route path={page.url} element={page.component} />
            ))}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
