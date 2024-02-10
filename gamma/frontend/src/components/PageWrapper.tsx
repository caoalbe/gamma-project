import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { themes } from "./theme";
import { github, repo } from "./external_links";
import {
  UserAPIProps,
  FollowingAPIProps,
  get_user_by_id,
  get_following,
  delete_follow,
  post_follow,
} from "./api_endpoints";

const suggestedUserID: string[] = [
  "b1d1d672-0373-4d53-8154-9dd9f5ed1236",
  "62506f94-653d-40f8-8351-1e513aac4d76",
];

interface PageWrapperProps {
  children: JSX.Element;
}
const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  const navigate = useNavigate();
  const { userID, userHandle, userDisplay, userPfp } = useContext(UserContext);
  const { pathname } = useLocation();

  const [followSuggestions, setFollowSuggestions] = useState<
    (UserAPIProps & Partial<{ isFollowing: Boolean }>)[]
  >([]);
  const [following, setFollowing] = useState<FollowingAPIProps[]>([]);

  // fetch all the info about suggested accounts to follow
  useEffect(() => {
    Promise.all(suggestedUserID.map((userID: string) => get_user_by_id(userID)))
      .then(
        // remove all nulls from fetchedData
        (fetchedData: (UserAPIProps | null)[]) =>
          fetchedData.filter(
            (entry: UserAPIProps | null) => entry !== null
          ) as UserAPIProps[]
      )
      .then((fetchedData: UserAPIProps[]) =>
        // add info for which users are already followed
        fetchedData.map((data: UserAPIProps) => ({
          ...data,
          isFollowing: following.some(
            (foll: FollowingAPIProps) => foll.end === data.userID
          ),
        }))
      )
      .then(
        (fetchedData: (UserAPIProps & Partial<{ isFollowing: Boolean }>)[]) => {
          setFollowSuggestions(fetchedData);
        }
      );
  }, [following]);

  // fetch the list of accounts the user follows
  useEffect(() => {
    if (userID === null) {
      return;
    }

    get_following(userID).then((followingData: FollowingAPIProps[]) => {
      setFollowing(followingData);
    });
  }, [userID]);

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
                      flex flex-col  
                      border-r ${themes["black"].border} 
                      justify-between`}
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
            {userID === null ? (
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
                  className={`flex py-1 w-11/12 rounded-full hover:${themes["black"].bgHover} duration-150 cursor-pointer select-none`}
                >
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
        <div className="w-[650px] flex-none">{props.children}</div>

        {/* right side bar */}
        <div
          className={`flex flex-1 h-dvh sticky top-0 
                      flex flex-col space-y-4              
                      border-l ${themes["black"].border} text-white`}
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
              {followSuggestions.map(
                (
                  entry: UserAPIProps & Partial<{ isFollowing: Boolean }>,
                  index: number
                ) => {
                  return (
                    <Link to={`../${entry.nameHandle}`}>
                      <div
                        className={`flex pl-4 py-2 hover:bg-zinc-800 duration-200 cursor-pointer select-none ${
                          index === followSuggestions.length - 1
                            ? "hover:rounded-b-xl"
                            : ""
                        }`}
                      >
                        <div id="pfp-section" className="w-2/12 pr-2">
                          <img
                            src={entry.pfp}
                            className="aspect-square rounded-full"
                            alt="pfp"
                          />
                        </div>
                        <div id="text-section" className="w-7/12 pl-1">
                          <span className="font-bold">{entry.nameDisplay}</span>
                          <br />
                          <span className={`${themes["black"].textSecondary}`}>
                            @{entry.nameHandle}
                          </span>
                        </div>
                        {userID === null || !entry.isFollowing ? (
                          <div
                            className="w-3/12 my-auto mr-3 px-3 py-1 
                                    border rounded-full text-center text-black font-bold
                                    bg-white hover:bg-slate-100"
                            onClick={(e) => {
                              e.preventDefault();
                              if (userID === null) {
                                navigate("/login");
                                return;
                              }
                              post_follow(userID, entry.userID);

                              // this just does followSuggestions[index].isFollowing = true
                              setFollowSuggestions((prevList) =>
                                prevList.map((value) =>
                                  value.userID === entry.userID
                                    ? { ...value, isFollowing: true }
                                    : value
                                )
                              );
                            }}
                          >
                            Follow
                          </div>
                        ) : (
                          <div
                            className="w-3/12 my-auto mr-3 px-2 py-1 
                                    border rounded-full text-center text-black font-bold
                                     hover:border-red-600 group"
                            onClick={(e) => {
                              e.preventDefault();
                              if (userID === null) {
                                navigate("/login");
                                return;
                              }
                              delete_follow(userID, entry.userID);

                              // this just does followSuggestions[index].isFollowing = false
                              setFollowSuggestions((prevList) =>
                                prevList.map((value) =>
                                  value.userID === entry.userID
                                    ? { ...value, isFollowing: false }
                                    : value
                                )
                              );
                            }}
                          >
                            <span
                              className={`inline group-hover:hidden ${themes["black"].textPrimary} text-xs`}
                            >
                              Following
                            </span>
                            <span className="hidden group-hover:inline text-red-600 text-xs">
                              Unfollow
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
            <div className="w-8/12 text-sm text-neutral-500">
              <span className="hover:underline">
                <a target="_blank" rel="noopener noreferrer" href={repo}>
                  Source Code
                </a>
              </span>
              {" · "}
              <span className="hover:underline">
                <a target="_blank" rel="noopener noreferrer" href={github}>
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
