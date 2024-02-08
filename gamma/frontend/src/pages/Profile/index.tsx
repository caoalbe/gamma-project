import { useState, useEffect, useContext } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserAPIProps,
  StatusAPIProps,
  FollowingAPIProps,
  get_user_by_handle,
  get_post,
  get_follower,
  get_following,
  post_follow,
  delete_follow,
} from "../../components/api_endpoints";
import Post from "../../components/Post";
import { UserContext } from "../../UserContext";
import { themes } from "../../components/theme";

const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const { nameHandle } = useParams();
  const { userID } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<UserAPIProps | null>(null);
  const [userPosts, setUserPosts] = useState<StatusAPIProps[]>([]);
  const [followers, setFollowers] = useState<FollowingAPIProps[]>([]);
  const [following, setFollowing] = useState<FollowingAPIProps[]>([]);
  const [userFollows, setUserFollow] = useState<boolean>(false); // true iff <userID> follows <userInfo.userID>
  const [unfollowHover, setUnfollowHover] = useState<boolean>(false); // true when mouse is hover the unfollow button

  // Fetch user info from server
  useEffect(() => {
    if (nameHandle === undefined) {
      setUserInfo(null);
    }
    get_user_by_handle(nameHandle as string).then(
      (result: UserAPIProps | null) => {
        setUserInfo(result);
      }
    );
  }, [nameHandle]);

  // Fetch this user's posts
  useEffect(() => {
    if (userInfo === null) {
      return;
    }

    get_post().then((result: StatusAPIProps[]) => {
      setUserPosts(
        // TODO: create endpoint to query status by nameHandle
        result.filter(
          (entry: StatusAPIProps) => entry.userID === userInfo.userID
        )
      );
    });
  }, [userInfo]);

  // Fetch follower information
  useEffect(() => {
    if (userInfo === null) {
      return;
    }

    // This user's followers
    get_follower(userInfo.userID).then((result: FollowingAPIProps[]) => {
      setFollowers(result);
      setUserFollow(result.some((user) => user.start === userID));
    });

    // This user's following
    get_following(userInfo.userID).then((result: FollowingAPIProps[]) => {
      setFollowing(result);
    });
  }, [userID, userInfo]);

  if (userInfo === null) {
    return (
      <PageWrapper>
        <></>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="flex-col">
        <div className={`border-b ${themes["black"].border} pl-6 py-1`}>
          <span
            className={`font-semibold text-xl ${themes["black"].textPrimary}`}
          >
            {userInfo.nameDisplay}
          </span>
          <br />
          <span className={`${themes["black"].textSecondary} text-sm/3`}>
            {userPosts.length} posts
          </span>
        </div>
        <div
          id="profile-card"
          className={`flex-col border-b ${themes["black"].border} pb-2`}
        >
          {userInfo.banner == null ? (
            <div id="pfp" className="ml-4 mb-2 pt-2">
              <img
                src={userInfo.pfp}
                className="aspect-square rounded-full w-3/12 border-4 border-black pointer-events-none"
                alt="pfp"
              />
            </div>
          ) : (
            <div id="banner" className="relative mb-16">
              <img src={userInfo.banner} className=" " alt="banner" />
              <div id="pfp" className="ml-4 absolute -bottom-14 w-3/12">
                <img
                  src={userInfo.pfp}
                  className="aspect-square rounded-full w-full border-4 border-black pointer-events-none"
                  alt="pfp"
                />
              </div>
            </div>
          )}

          <div id="info" className="pl-4 space-y-2">
            <div className="flex">
              <div id="names" className="flex-col">
                <div id="display" className="flex">
                  <div>
                    <span
                      className={`font-bold text-xl ${themes["black"].textPrimary}`}
                    >
                      {userInfo.nameDisplay}
                    </span>
                  </div>
                </div>
                <div id="handle" className="flex space-x-2">
                  <div>
                    <span className={`${themes["black"].textSecondary}`}>
                      @{userInfo.nameHandle}
                    </span>
                  </div>
                  {following.some((user) => user.end === userID) ? (
                    <div className="bg-neutral-800 rounded px-1 h-min my-auto leading-none">
                      <span
                        className={`${themes["black"].textSecondary} text-xs`}
                      >
                        Follows You
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {userID === null || !userFollows ? (
                <div
                  id="follow"
                  className="ml-auto my-auto mr-4 w-2/12 px-3 py-1 
                                    border rounded-full text-center text-lg text-black font-bold
                                    bg-white hover:bg-slate-100
                                    cursor-pointer select-none"
                  onClick={() => {
                    setUserFollow(true);
                    if (userID === null) {
                      // redirect
                      navigate("/login");
                    }
                    post_follow(userID as string, userInfo.userID);
                  }}
                >
                  Follow
                </div>
              ) : (
                <div
                  id="unfollow"
                  className="ml-auto my-auto mr-4 w-2/12 px-3 py-1 
                                    rounded-full text-center text-lg font-bold
                                    border rounded-full hover:text-red-600 hover:border-red-600 
                                    cursor-pointer select-none"
                  onPointerOver={() => {
                    setUnfollowHover(true);
                  }}
                  onPointerOut={() => {
                    setUnfollowHover(false);
                  }}
                  onClick={() => {
                    setUserFollow(false);
                    delete_follow(userID, userInfo.userID);
                  }}
                >
                  {unfollowHover ? "Unfollow" : "Following"}
                </div>
              )}
            </div>

            <div>
              {userInfo.bio === null ? (
                <></>
              ) : (
                <>
                  <span className={`${themes["black"].textPrimary}`}>
                    {userInfo.bio}
                  </span>
                  <br />
                </>
              )}
              <span className={` ${themes["black"].textSecondary} leading-10`}>
                Joined{" "}
                {new Date(userInfo.dateTimeJoined).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric" as const,
                    month: "long" as const,
                  }
                )}
              </span>
              <br />
              <div className="flex space-x-3">
                <div>
                  <span
                    className={`font-bold text-sm ${themes["black"].textPrimary}`}
                  >
                    {following.length}{" "}
                  </span>
                  <span className={`${themes["black"].textSecondary} text-sm`}>
                    Following
                  </span>
                </div>
                <div>
                  <span
                    className={`font-bold text-sm ${themes["black"].textPrimary}`}
                  >
                    {followers.length}{" "}
                  </span>
                  <span className={`${themes["black"].textSecondary} text-sm`}>
                    Followers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userPosts.map((entry) => (
          <Post
            statusID={entry.statusID}
            replyID={entry.replyID}
            userID={entry.userID}
            text={entry.text}
            media1={entry.media1}
            dateTimePosted={entry.dateTimePosted}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Profile;
