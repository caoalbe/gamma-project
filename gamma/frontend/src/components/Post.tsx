import { useEffect, useState, useContext } from "react";
import { process_date_time } from "./utils";
import {
  UserAPIProps,
  StatusAPIProps,
  get_user_by_id,
  query_like,
  post_like,
  delete_like,
} from "./api_endpoints";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Post = (props: StatusAPIProps): JSX.Element => {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps | null>(null);

  const [likeHovered, setLikeHovered] = useState<boolean>(false);
  const [userLikes, setUserLikes] = useState<boolean>(false);
  const [replyHovered, setReplyHovered] = useState<boolean>(false);

  // Fetch author info from server
  useEffect(() => {
    get_user_by_id(props.userID).then((result) => {
      setAuthorInfo(result);
    });
  }, [props.userID]);

  // Check if post is already liked
  useEffect(() => {
    if (userID === null) {
      return;
    }
    query_like(props.statusID, userID).then((res) => {
      setUserLikes(res);
    });
  }, [props.statusID, userID]);

  if (authorInfo === null) {
    return <></>;
  }

  return (
    <>
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
                  className="rounded-lg w-1/2 mt-2"
                  alt="media 1"
                />
              </>
            )}
          </div>
          <div id="actions" className="flex">
            <div
              className="flex select-none px-5 mr-10 text-neutral-500 hover:text-red-500"
              onClick={() => {
                if (userID === null) {
                  navigate("/login");
                  return;
                }

                if (userLikes) {
                  // unlike post
                  delete_like(props.statusID, userID);
                  setUserLikes(false);
                } else {
                  post_like(props.statusID, userID);
                  setUserLikes(true);
                  // like post
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
              <span className="leading-loose text-sm">1738</span>
            </div>
            <div
              className="flex select-none px-5 mr-10 text-neutral-500 hover:text-blue-500"
              onClick={() => {
                console.log("replied!");
              }}
              onPointerOver={() => {
                setReplyHovered(true);
              }}
              onPointerOut={() => {
                setReplyHovered(false);
              }}
            >
              <span className="text-xl">{replyHovered ? "💬" : "💭"}</span>
              <span className="leading-loose text-sm">679</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
