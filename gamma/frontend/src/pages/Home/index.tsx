import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import PageWrapper from "../../components/PageWrapper";
import {
  StatusAPIProps,
  post_status,
  get_post,
} from "../../components/api_endpoints";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

const minTextSize: number = 3;

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { userID, userHandle, userPfp } = useContext(UserContext);

  const [posts, setPosts] = useState<StatusAPIProps[]>([]);
  const [draftText, setDraftText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch posts from server
  useEffect(() => {
    get_post().then((result) => {
      setPosts(result);
    });
  }, []);

  // Resize the text area to create new post
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.rows = 1;
      const lineHeight = parseInt(
        getComputedStyle(textAreaRef.current).lineHeight,
        10
      );
      const newLineCount =
        Math.ceil(textAreaRef.current.scrollHeight / lineHeight) - 1;

      textAreaRef.current.rows = Math.max(minTextSize, newLineCount);
    }
  }, [draftText]);

  return (
    <PageWrapper>
      <div className="text-white">
        {/* <div className="flex border-b border-neutral-700 pl-4 py-3 w-5/12 bg-black fixed">
          <div className="block w-1/2 text-center">
            <span className="text-xl">Following</span>
          </div>
          <div className="block w-1/2 text-center">
            <span className="text-xl">For You</span>
          </div>
        </div> */}
        {/* TODO: replace same height hack to workaround fixed position  */}
        {/* <div className="flex border-b border-neutral-700 pl-4 py-3 w-5/12 bg-black">
          <div className="block w-1/2 text-center">
            <span className="text-xl">Following</span>
          </div>
          <div className="block w-1/2 text-center">
            <span className="text-xl">For You</span>
          </div>
        </div> */}
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
          <div id="right-col" className="flex-col w-11/12 space-y-0.5">
            <div id="text-box">
              <textarea
                placeholder="What is happening?!"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                ref={textAreaRef}
                className="block w-full bg-black resize-none
                              py-1.5 pl-2 pr-8 text-xl text-white
                              placeholder:text-neutral-500 focus:outline-0"
                rows={minTextSize}
              />
            </div>
            <div
              id="actions"
              className="w-fit ml-auto text-center rounded-full
                            mr-2 px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
            >
              <button
                onClick={() => {
                  if (userID === null) {
                    navigate("/login");
                  } else {
                    post_status(userID, draftText, null);
                    setDraftText("");
                  }
                }}
                className="text-lg font-semibold select-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
        {posts.map((entry) => (
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

export default Home;
