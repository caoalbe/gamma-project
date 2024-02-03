import { useEffect, useState, useContext } from "react";
import Post from "../../components/Post";
import PageWrapper from "../../components/PageWrapper";
import ComposeStatus from "../../components/ComposeStatus";
import { StatusAPIProps, get_post } from "../../components/api_endpoints";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  const { userHandle, userPfp } = useContext(UserContext);

  const [posts, setPosts] = useState<StatusAPIProps[]>([]);

  // Fetch posts from server
  useEffect(() => {
    get_post().then((result) => {
      setPosts(result);
    });
  }, []);

  return (
    <PageWrapper>
      <div className="text-white">
        <div className="py-6 border-b border-neutral-700" />
        <div
          id="write-your-tweet"
          className="flex pt-2 pb-3 pr-3 border-b border-neutral-700"
        >
          <div id="pfp-col" className="w-1/12">
            {userHandle === null ? (
              <></>
            ) : (
              <Link to={`../${userHandle}`}>
                <img
                  src={userPfp as string}
                  className="aspect-square rounded-full p-1"
                  alt="write-pfp"
                />
              </Link>
            )}
          </div>
          <div className="w-11/12">
            <ComposeStatus
              placeholder="What is happening?!"
              minLineCount={2}
              buttonText="Post"
              callbackFunction={(newPost) => {
                setPosts([newPost, ...posts]);
              }}
            />
          </div>
        </div>
        {posts.map((entry) => {
          return (
            <Post
              statusID={entry.statusID}
              userID={entry.userID}
              text={entry.text}
              media1={entry.media1}
              dateTimePosted={entry.dateTimePosted}
            />
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Home;
