import { useEffect, useState, useContext } from "react";
import { process_date_time } from "./utils";
import {
  UserAPIProps,
  StatusAPIProps,
  get_user_by_id,
  query_like,
  post_like,
  delete_like,
  get_like_by_status,
  get_post,
} from "./api_endpoints";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ComposeStatus from "../components/ComposeStatus";

const Post = (props: StatusAPIProps): JSX.Element => {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps | null>(null);

  // Likes
  const [likeHovered, setLikeHovered] = useState<boolean>(false);
  const [userLikes, setUserLikes] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(-1);

  // Replies
  const [replyHovered, setReplyHovered] = useState<boolean>(false);
  const [replyOpened, setReplyOpened] = useState<boolean>(false);
  const [replyCount, setReplyCount] = useState<number>(-1);

  // Replying To
  const [parentStatus, setParentState] = useState<StatusAPIProps | null>(null);
  const [parentAuthorInfo, setParentAuthorInfo] = useState<UserAPIProps | null>(
    null
  );

  // Fetch author info from server
  useEffect(() => {
    get_user_by_id(props.userID).then((result) => {
      setAuthorInfo(result);
    });
  }, [props.userID]);

  // Fetch parent post info from server
  useEffect(() => {
    if (props.replyID === null) {
      return;
    }

    get_post()
      .then((result: StatusAPIProps[]) =>
        result.filter(
          (entry: StatusAPIProps) => entry.statusID === props.replyID
        )
      )
      .then((result: StatusAPIProps[]) => {
        if (result.length === 0) {
          // todo: post was deleted
          return;
        }
        setParentState(result[0]);
      });
  }, [props.replyID]);

  // Fetch account info of parent poster
  useEffect(() => {
    if (parentStatus === null) {
      return;
    }
    get_user_by_id(parentStatus.userID).then((result) => {
      setParentAuthorInfo(result);
    });
  }, [parentStatus]);

  // Check if post is already liked
  useEffect(() => {
    if (userID === null) {
      return;
    }
    query_like(props.statusID, userID).then((res) => {
      setUserLikes(res);
    });
  }, [props.statusID, userID]);

  // Get like count
  useEffect(() => {
    get_like_by_status(props.statusID).then((res) => {
      setLikeCount(res.length);
    });
  }, [props.statusID]);

  // Get reply count
  useEffect(() => {
    // todo: create api query for posts according to reply
    get_post()
      .then((result: StatusAPIProps[]) =>
        result.filter(
          (entry: StatusAPIProps) => entry.replyID === props.statusID
        )
      )
      .then((result: StatusAPIProps[]) => {
        setReplyCount(result.length);
      });
  });

  if (authorInfo === null) {
    return <></>;
  }

  return (
    <>
      {/* todo: dedicated status page */}
      <Link to={`../${authorInfo.nameHandle}`}>
        <div
          id="post"
          className="flex py-2 pr-3 border-b border-neutral-700 hover:bg-zinc-950 duration-300"
        >
          <div id="pfp-col" className="w-1/12 pl-2 pr-1">
            <Link to={`../${authorInfo.nameHandle}`}>
              <img
                src={authorInfo.pfp}
                className="aspect-square rounded-full"
                alt="pfp"
              />
            </Link>
          </div>
          <div id="right-col" className="flex-col w-11/12 space-y-0.5 pl-1">
            <div className="">
              <Link to={`../${authorInfo.nameHandle}`}>
                <span className="font-semibold decoration-1 hover:underline leading-tight">
                  {authorInfo.nameDisplay}
                </span>
                <span className="text-neutral-500 leading-tight">
                  {" "}
                  @{authorInfo.nameHandle}
                </span>
              </Link>

              <span className="text-neutral-500 leading-tight">
                {" "}
                · {process_date_time(props.dateTimePosted)}
              </span>
              <br />
              <span>{props.text}</span>
              {props.media1 === null ? (
                <></>
              ) : (
                <>
                  <img
                    src={props.media1}
                    className="rounded-lg w-10/12 mt-2 mx-auto"
                    alt="media 1"
                  />
                </>
              )}
            </div>
            {parentStatus === null || parentAuthorInfo === null ? (
              <></>
            ) : (
              // todo: dedicated status page
              <Link to={`../${parentAuthorInfo.nameHandle}`}>
                <div
                  id="reply-post"
                  className="border border-neutral-700 rounded-xl flex p-2 mt-2"
                >
                  <div className="">
                    <img
                      src={parentAuthorInfo.pfp}
                      className="h-6 aspect-square rounded-full inline"
                      alt="pfp"
                    />

                    <span className="font-semibold  leading-tight">
                      {" "}
                      {parentAuthorInfo.nameDisplay}
                    </span>
                    <span className="text-neutral-500 leading-tight">
                      {" "}
                      @{parentAuthorInfo.nameHandle}
                    </span>

                    <span className="text-neutral-500 leading-tight">
                      {" "}
                      · {process_date_time(parentStatus.dateTimePosted)}
                    </span>
                    <br />
                    <span>{parentStatus.text}</span>
                    {parentStatus.media1 === null ? (
                      <></>
                    ) : (
                      <>
                        <img
                          src={parentStatus.media1}
                          className="rounded-lg w-7/12 mt-2 mx-auto"
                          alt="media 1"
                        />
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )}
            <div id="actions" className="flex">
              <div
                className={`flex select-none px-5 mr-10 ${
                  userLikes ? "text-red-500" : "text-neutral-500"
                } hover:text-red-500 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault(); // prevents the link from redirecting
                  if (userID === null) {
                    navigate("/login");
                    return;
                  }

                  if (userLikes) {
                    // unlike post
                    delete_like(props.statusID, userID);
                    setUserLikes(false);
                    setLikeCount(likeCount - 1);
                  } else {
                    // like post
                    post_like(props.statusID, userID);
                    setUserLikes(true);
                    setLikeCount(likeCount + 1);
                  }
                }}
                onPointerOver={() => {
                  setLikeHovered(true);
                }}
                onPointerOut={() => {
                  setLikeHovered(false);
                }}
              >
                <span className="text-xl">
                  {likeHovered || userLikes ? "💗" : "💙"}
                </span>
                <span className="leading-loose text-sm">{likeCount}</span>
              </div>
              <div
                className={`flex select-none px-5 mr-10 ${
                  replyOpened ? "text-blue-500" : "text-neutral-500"
                } hover:text-blue-500 cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault(); // prevents the link from redirecting
                  setReplyOpened(!replyOpened);
                }}
                onPointerOver={() => {
                  setReplyHovered(true);
                }}
                onPointerOut={() => {
                  setReplyHovered(false);
                }}
              >
                <span className="text-xl">
                  {replyOpened || replyHovered ? "💬" : "💭"}
                </span>
                <span className="leading-loose text-sm">{replyCount}</span>
              </div>
            </div>
            {replyOpened ? (
              <div className="">
                <ComposeStatus
                  placeholder="Post your reply!"
                  buttonText="Reply"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
