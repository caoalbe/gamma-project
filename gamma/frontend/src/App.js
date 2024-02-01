import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageInfo from "./registry";
import { UserContext } from "./UserContext";
import { useState, useMemo } from "react";

function App() {
  const [userID, setUserID] = useState(null);
  const [userHandle, setUserHandle] = useState(null);
  const [userDisplay, setUserDisplay] = useState(null);
  const [userPfp, setUserPfp] = useState(null);

  const value = useMemo(
    () => ({
      userID,
      setUserID,
      userHandle,
      setUserHandle,
      userDisplay,
      setUserDisplay,
      userPfp,
      setUserPfp,
    }),
    [
      userID,
      setUserID,
      userHandle,
      setUserHandle,
      userDisplay,
      setUserDisplay,
      userPfp,
      setUserPfp,
    ]
  );

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
