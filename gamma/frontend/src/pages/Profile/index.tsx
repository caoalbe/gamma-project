import { useState, useEffect, useContext } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useParams } from "react-router-dom";
import {
  UserAPIProps,
  StatusAPIProps,
  FollowingAPIProps,
  get_user_by_handle,
  get_post,
  get_follower,
  get_following,
} from "../../components/api_endpoints";
import Post from "../../components/Post";
import { UserContext } from "../../UserContext";

const Profile = (): JSX.Element => {
  const { nameHandle } = useParams();
  const { userID } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<UserAPIProps | null>(null);
  const [userPosts, setUserPosts] = useState<StatusAPIProps[]>([]);
  const [followers, setFollowers] = useState<FollowingAPIProps[]>([]);
  const [following, setFollowing] = useState<FollowingAPIProps[]>([]);

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

  // Fetch data from server
  useEffect(() => {
    if (userInfo === null) {
      return;
    }

    // This user's posts
    get_post().then((result: StatusAPIProps[]) => {
      setUserPosts(
        // TODO: create endpoint to query status by nameHandle
        result.filter(
          (entry: StatusAPIProps) => entry.userID === userInfo.userID
        )
      );
    });

    // This user's followers
    get_follower(userInfo.userID).then((result: FollowingAPIProps[]) => {
      setFollowers(result);
    });

    // This user's following
    get_following(userInfo.userID).then((result: FollowingAPIProps[]) => {
      setFollowing(result);
    });
  }, [userInfo]);

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
        <div className="border-b border-neutral-700 pl-6 py-1">
          <span className="font-semibold text-xl">{userInfo.nameDisplay}</span>
          <br />
          <span className="text-neutral-500 text-sm/3">
            {userPosts.length} posts
          </span>
        </div>
        <div
          id="profile-card"
          className="flex-col border-b border-neutral-700 pb-2"
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
            <div className="flex-col">
              <div>
                <span className="font-bold text-xl">
                  {userInfo.nameDisplay}
                </span>
              </div>
              <div className="flex space-x-2">
                <div>
                  <span className="text-neutral-500">
                    @{userInfo.nameHandle}
                  </span>
                </div>
                {following.some((user) => user.end === userID) ? (
                  <div className="bg-neutral-800 rounded px-1 h-min my-auto leading-none">
                    <span className="text-neutral-500 text-xs ">
                      Follows You
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              {userInfo.bio === null ? (
                <></>
              ) : (
                <>
                  <span>{userInfo.bio}</span>
                  <br />
                </>
              )}
              <span className="text-neutral-500 leading-10">
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
                  <span className="font-bold text-sm">{following.length} </span>
                  <span className="text-neutral-500 text-sm">Following</span>
                </div>
                <div>
                  <span className="font-bold text-sm">{followers.length} </span>
                  <span className="text-neutral-500 text-sm">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userPosts.map((entry) => (
          <Post
            statusID={entry.statusID}
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
