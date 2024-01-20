import { useState, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useParams } from "react-router-dom";
import {
  UserAPIProps,
  StatusAPIProps,
  GET_USER_HANDLE,
  GET_STATUS,
} from "../../components/api_endpoints";
import Post from "../../components/Post";

const MISSING_USER: UserAPIProps = {
  userID: "",
  nameHandle: "",
  nameDisplay: "",
  bio: "",
};

const Profile = (): JSX.Element => {
  const { nameHandle } = useParams();
  const [userInfo, setUserInfo] = useState<UserAPIProps>(MISSING_USER);
  const [userPosts, setUserPosts] = useState<Array<StatusAPIProps>>([]);

  // Fetch user posts from server
  useEffect(() => {
    fetch(`${GET_STATUS}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(
          // TODO: create endpoint to query by nameHandle
          data.filter(
            (entry: StatusAPIProps) => entry.userID === userInfo.userID
          )
        );
      })
      .catch((error) => {
        setUserPosts([]);
      });
  }, [userInfo]);

  // Fetch user info from server
  useEffect(() => {
    fetch(`${GET_USER_HANDLE}${nameHandle}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 1) {
          throw new Error(`User handle should be unique: ${nameHandle}`);
        }

        if (data.length === 0) {
          setUserInfo(MISSING_USER);
        }

        if (data.length === 1) {
          setUserInfo(data[0]);
        }
      });
  }, [nameHandle]);

  if (userInfo === MISSING_USER) {
    return (
      <PageWrapper>
        <></>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="flex-col">
        <div
          id="profile-card"
          className="flex-col border-b border-neutral-700 pb-2"
        >
          <div id="banner">banner</div>
          <div id="pfp">pfp</div>
          <div id="info" className="pl-4 space-y-2">
            <div>
              <span className="font-bold text-xl">{userInfo.nameDisplay}</span>
              <br />
              <span className="text-neutral-500">@{userInfo.nameHandle}</span>
            </div>
            <div>
              {userInfo.bio === "" ? (
                <>
                  <span>{userInfo.bio}</span>
                  <br />
                </>
              ) : (
                <></>
              )}
              <span className="text-neutral-500">Joined January 2024</span>
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
            dateTimePosted={entry.dateTimePosted}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Profile;