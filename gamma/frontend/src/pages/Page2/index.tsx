import { useEffect, useState, useRef } from "react";
import Post from "../../components/Post";

const FETCH_URL = "http://localhost:8000/api/get_post_data/";
const CREATE_URL = "http://localhost:8000/api/create_post_data/";
const minTextSize: number = 3;

const Page2 = (): JSX.Element => {
  const [posts, setPosts] = useState<any[]>([]);
  const [draftText, setDraftText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch posts from server
  useEffect(() => {
    fetch(FETCH_URL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
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
    <>
      <div className="flex bg-black">
        <div className="flex-col w-3/12 space-y-6 pt-3 px-4 border-r h-dvh fixed">
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Home</span>
          </div>
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Button 2</span>
          </div>
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Other</span>
          </div>
        </div>
        {/* TODO: replace same width hack to workaorund fixed position  */}
        <div className="w-3/12" />
        <div className="w-5/12 text-white">
          <div className="flex border-b pl-4 py-3 w-5/12 bg-black fixed">
            <div className="block w-1/2 text-center">
              <span className="text-xl">Following</span>
            </div>
            <div className="block w-1/2 text-center">
              <span className="text-xl">For You</span>
            </div>
          </div>
          {/* TODO: replace same height hack to workaorund fixed position  */}
          <div className="flex border-b pl-4 py-3 w-5/12 bg-black">
            <div className="block w-1/2 text-center">
              <span className="text-xl">Following</span>
            </div>
            <div className="block w-1/2 text-center">
              <span className="text-xl">For You</span>
            </div>
          </div>
          <div id="write-your-tweet" className="flex pt-2 pb-3 pr-3 border-b">
            <div id="pfp-col" className="w-1/12"></div>
            <div id="right-col" className="flex-col w-11/12 space-y-0.5">
              <div id="text-box">
                <textarea
                  placeholder="What is happening?!"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  ref={textAreaRef}
                  className="block w-full bg-black resize-none 
                              py-1.5 pl-2 pr-8 text-xl text-white
                              placeholder:text-gray-400 focus:outline-0"
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
                    console.log("pressed!");
                    fetch(CREATE_URL, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        nameDisplay: "display",
                        nameHandle: "handle",
                        postText: draftText,
                        datePosted: "2024-01-10",
                      }),
                    });
                    setDraftText("");
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
              nameDisplay={entry.nameDisplay}
              nameHandle={entry.nameHandle}
              date={entry.datePosted}
              postText={entry.postText}
            />
          ))}
        </div>
        <div className="w-4/12 text-white border-l"></div>
      </div>
    </>
  );
};

export default Page2;
