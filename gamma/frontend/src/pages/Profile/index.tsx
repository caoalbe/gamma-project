import { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useParams } from "react-router-dom";
import {
  UserAPIProps,
  StatusAPIProps,
  get_user_by_handle,
  get_post,
} from "../../components/api_endpoints";
import Post from "../../components/Post";

const Profile = (): JSX.Element => {
  const { nameHandle } = useParams();
  const [userInfo, setUserInfo] = useState<UserAPIProps | null>(null);
  const [userPosts, setUserPosts] = useState<Array<StatusAPIProps>>([]);

  // Fetch user info from server
  useEffect(() => {
    if (nameHandle === undefined) {
      setUserInfo(null);
    }
    get_user_by_handle(nameHandle as string).then((result) => {
      setUserInfo(result);
    });
  }, [nameHandle]);

  // Fetch user posts from server
  useEffect(() => {
    if (userInfo === null) {
      return;
    }
    get_post().then((result) => {
      setUserPosts(
        // TODO: create endpoint to query status by nameHandle
        result.filter(
          (entry: StatusAPIProps) => entry.userID === userInfo.userID
        )
      );
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
          <span className="text-neutral-500 text-sm/3">20.2K posts</span>
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
            <div>
              <span className="font-bold text-xl">{userInfo.nameDisplay}</span>
              <br />
              <span className="text-neutral-500">@{userInfo.nameHandle}</span>
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
                Joined January 2024
              </span>
              <br />
              <div className="flex space-x-3">
                <div>
                  <span className="font-bold text-sm">7 </span>
                  <span className="text-neutral-500 text-sm">Following</span>
                </div>
                <div>
                  <span className="font-bold text-sm">5 </span>
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
