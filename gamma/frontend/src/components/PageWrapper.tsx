import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

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
      <div className="flex bg-black">
        {/* left side bar */}
        <div className="flex-col w-3/12 pt-3 pl-48 border-r border-neutral-700 h-dvh fixed">
          <div className="flex-col space-y-3">
            {SideBarButtons.map((entry) => (
              <div className="w-11/12 group">
                <Link to={entry.path}>
                  <div className="w-min py-2 px-6 rounded-full group-hover:bg-zinc-900 duration-150">
                    <span
                      className={`text-white text-2xl select-none ${
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

          <div className="absolute bottom-0 left-0 pl-48 pr-2 mb-5 w-full">
            {userHandle === null ? (
              <>
                <div className="group w-11/12">
                  <Link to={"/login"}>
                    <div className="mx-auto w-fit py-2 px-8 rounded-full text-center group-hover:bg-zinc-900 duration-150">
                      <span className="text-white font-bold text-lg">
                        Log In
                      </span>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex py-1 rounded-full hover:bg-zinc-900 duration-150">
                  <div id="pfp" className="w-3/12 p-2">
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
                    <span className="text-white font-bold ">{userDisplay}</span>
                    <br />
                    <span className="text-neutral-500">@{userHandle}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* TODO: replace same width hack to workaorund fixed position  */}
        <div
          id="spacing-hack"
          className="flex-col w-3/12 space-y-6 pt-3 px-4 border-r h-dvh"
        />

        {/* middle content */}
        <div className="w-5/12 text-white">{props.children}</div>

        {/* right side bar */}
        {/* todo: sticky right sidebar */}
        <div className="w-4/12 text-white border-l border-neutral-700 flex-col space-y-4 pl-10 pt-4">
          <div className="w-8/12 bg-zinc-900 rounded-full py-2 pl-4">
            <span className="text-md text-neutral-500">Fake Search Bar</span>
          </div>
          <div className="w-8/12 bg-zinc-900 rounded-xl pt-3 flex-col">
            <div className="pl-4 pb-2">
              <span className="text-xl  font-bold">What's happening</span>
            </div>
            {/* cards */}
            <div className="flex pl-4 py-2 hover:bg-zinc-800 duration-200">
              <div id="text" className="w-9/12">
                <span className="text-neutral-500 text-sm">
                  Sports · Trending
                </span>
                <br />
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
            <div className="flex pl-4 py-2 hover:bg-zinc-800 duration-200">
              <div id="text" className="w-9/12">
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
            <div className="flex pl-4 py-2 hover:bg-zinc-800 duration-200 hover:rounded-b-xl">
              <div id="text" className="w-9/12">
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
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
    </>
  );
};

export default PageWrapper;
