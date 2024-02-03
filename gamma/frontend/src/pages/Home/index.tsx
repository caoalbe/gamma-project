import { useEffect, useState, useRef, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import PageWrapper from "../../components/PageWrapper";
import ComposeStatus from "../../components/ComposeStatus";
import {
  StatusAPIProps,
  post_status,
  get_post,
} from "../../components/api_endpoints";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const { userID, userHandle, userPfp } = useContext(UserContext);

  const [posts, setPosts] = useState<StatusAPIProps[]>([]);
  const [draftText, setDraftText] = useState<string>("");

  const mediaInputRef = useRef<HTMLInputElement>(null);
  const [media1, setMedia1] = useState<File | null>(null);
  const [previewMedia1, setPreviewMedia1] = useState<string | null>(null);

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
          <div id="right-col" className="flex-col w-11/12 space-y-0.5">
            <ComposeStatus
              placeholder="What is happening?!"
              text={draftText}
              setText={setDraftText}
            />
            {previewMedia1 === null ? (
              <></>
            ) : (
              <div className="mb-2">
                <img
                  src={previewMedia1}
                  className="rounded-lg w-1/2 pb-2 cursor-pointer"
                  // todo: move this into a dedicated 'x' button
                  onClick={() => {
                    setMedia1(null);
                    setPreviewMedia1(null);
                  }}
                  alt="pfp"
                />
              </div>
            )}
            <div id="actions" className="flex border-t pt-3 border-neutral-700">
              <div
                className="border-2  rounded px-1 py-auto leading-8
                  select-none cursor-pointer
                  border-blue-400 hover:border-blue-500 active:border-blue-600"
              >
                <input
                  type="file"
                  ref={mediaInputRef}
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setMedia1(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewMedia1(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setMedia1(null);
                      setPreviewMedia1(null);
                    }
                  }}
                />
                <span
                  onClick={() => {
                    mediaInputRef.current?.click();
                  }}
                  className="text-xl leading-none"
                >
                  📸
                </span>
              </div>
              <div
                onClick={() => {
                  if (userID === null) {
                    navigate("/login");
                  } else {
                    post_status(userID, draftText, media1);
                    setPosts([
                      {
                        statusID: "",
                        userID: userID,
                        text: draftText,
                        media1: previewMedia1,
                        dateTimePosted: new Date().toString(),
                      },
                      ...posts,
                    ]);
                    setDraftText("");
                    setMedia1(null);
                  }
                }}
                className="w-fit ml-auto text-center rounded-full
                            mr-2 px-5 py-1
                            bg-blue-400 hover:bg-blue-500 active:bg-blue-600
                            text-lg font-semibold select-none cursor-pointer"
              >
                Post
              </div>
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
