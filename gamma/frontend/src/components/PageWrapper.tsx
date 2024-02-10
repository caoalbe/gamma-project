import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { themes } from "./theme";

interface PageWrapperProps {
  children: JSX.Element;
}
const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const { userHandle, userDisplay, userPfp } = useContext(UserContext);
  const { pathname } = useLocation();

  const SideBarButtons = [
    {
      label: "Home",
      path: "../home/",
    },
    {
      label: "Profile",
      path: userHandle === null ? "../login" : `../${userHandle}`,
    },
    {
      label: "Settings",
      path: "../settings",
    },
    {
      label: "Login",
      path: "../login",
    },
  ];

  return (
    <>
      <div className={`flex ${themes["black"].bgBase}`}>
        {/* left side bar */}
        <div
          className={`flex-1 h-dvh sticky top-0
            border-r ${themes["black"].border} 
            flex flex-col justify-between`}
        >
          <div
            id="left-main-buttons"
            className="w-60 ml-auto mt-3 flex-col space-y-3"
          >
            {SideBarButtons.map((entry) => (
              <div className="w-11/12 group">
                <Link to={entry.path}>
                  <div
                    className={`w-min py-2 px-6 rounded-full group-hover:${themes["black"].bgHover} duration-150`}
                  >
                    <span
                      className={`${
                        themes["black"].textPrimary
                      } text-2xl select-none ${
                        ".." + pathname === entry.path
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {entry.label}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div id="left-account-button" className="w-60 ml-auto mb-3">
            {userHandle === null ? (
              <>
                <div className="group w-11/12">
                  <Link to={"/login"}>
                    <div
                      className={`mx-auto w-fit py-2 px-8 rounded-full text-center group-hover:${themes["black"].bgHover} duration-150`}
                    >
                      <span
                        className={`${themes["black"].textPrimary} font-bold text-lg`}
                      >
                        Log In
                      </span>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`flex py-1 w-11/12 rounded-full hover:${themes["black"].bgHover} duration-150`}
                >
                  <div id="pfp" className="w-2/12 p-2">
                    {userPfp === null ? (
                      <></>
                    ) : (
                      <img
                        src={userPfp}
                        className="aspect-square rounded-full"
                        alt="pfp"
                      />
                    )}
                  </div>
                  <div
                    id="text"
                    className="w-9/12 mr-3 my-auto overflow-hidden text-clip whitespace-nowrap leading-tight"
                  >
                    <span
                      className={`${themes["black"].textPrimary} font-bold `}
                    >
                      {userDisplay}
                    </span>
                    <br />
                    <span className={`${themes["black"].textSecondary}`}>
                      @{userHandle}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* middle content */}
        <div className="w-[650px]">{props.children}</div>

        {/* right side bar */}
        <div
          className={`flex-1 h-dvh sticky top-0 
                        border-l ${themes["black"].border} text-white 
                        flex flex-col flex-none space-y-4`}
        >
          <div
            id="right-content"
            className="flex flex-col w-[348px] space-y-3 mt-2 ml-4"
          >
            <div className="bg-zinc-900 rounded-full py-2 pl-4">
              <span className="text-md text-neutral-500">Fake Search Bar</span>
            </div>
            <div className="bg-zinc-900 rounded-xl pt-3 flex-col">
              <div className="pl-4 pb-2">
                <span className="text-xl font-bold">Who to follow</span>
              </div>
              {/* cards */}
              {[
                {
                  top: "Sports · Trending",
                  mid: "Clippers at Timberwolves",
                  bot: "NBA · 4 hours ago",
                },
                {
                  top: "",
                  mid: "Clippers at Timberwolves",
                  bot: "NBA · 4 hours ago",
                },
                {
                  top: "",
                  mid: "Clippers at Timberwolves",
                  bot: "NBA · 4 hours ago",
                },
              ].map((entry) => (
                <div className="flex pl-4 py-2 hover:bg-zinc-800 duration-200">
                  <div id="text" className="w-9/12">
                    {entry.top === "" ? (
                      <></>
                    ) : (
                      <>
                        <span className="text-neutral-500 text-sm">
                          {entry.top}
                        </span>
                        <br />
                      </>
                    )}
                    <span className="font-bold">{entry.mid}</span>
                    <br />
                    <span className="text-neutral-500 text-sm">
                      {entry.bot}
                    </span>
                  </div>
                  <div id="img" className="w-3/12">
                    picture of ANT <br />
                    dddd
                  </div>
                </div>
              ))}
            </div>
            <div className="w-8/12 text-sm text-neutral-500">
              <span className="hover:underline">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/caoalbe/gamma-project"
                >
                  Source Code
                </a>
              </span>
              {" · "}
              <span className="hover:underline">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/caoalbe"
                >
                  Github
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWrapper;
