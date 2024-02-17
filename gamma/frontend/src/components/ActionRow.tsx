import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { themes } from "./theme";
import ComposeStatus from "../components/ComposeStatus";
import {
  StatusAPIProps,
  delete_like,
  post_like,
  query_like,
  get_like_by_status,
  get_post,
  get_post_replyID,
} from "../components/api_endpoints";

const ActionRow = ({
  statusProps,
  forceOpenReply = false,
  partitionCompose = false,
}: {
  statusProps: StatusAPIProps;
  forceOpenReply?: boolean;
  partitionCompose?: boolean;
}): JSX.Element => {
  const { userID } = useContext(UserContext);
  const navigate = useNavigate();

  // Likes
  const [likeHovered, setLikeHovered] = useState<boolean>(false);
  const [userLikes, setUserLikes] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(-1);

  // Replies
  const [replyHovered, setReplyHovered] = useState<boolean>(false);
  const [replyOpened, setReplyOpened] = useState<boolean>(false);
  const [replyCount, setReplyCount] = useState<number>(-1);

  // Check if post is already liked
  useEffect(() => {
    if (userID === null) {
      return;
    }
    query_like(statusProps.statusID, userID).then((res) => {
      setUserLikes(res);
    });
  }, [statusProps.statusID, userID]);

  // Get like count
  useEffect(() => {
    get_like_by_status(statusProps.statusID).then((res) => {
      setLikeCount(res.length);
    });
  }, [statusProps.statusID]);

  // Get reply count
  useEffect(() => {
    get_post_replyID(statusProps.statusID).then((result: StatusAPIProps[]) => {
      setReplyCount(result.length);
    });
  }, [statusProps.statusID]);

  return (
    <>
      <div id="actions" className={`flex ${partitionCompose ? "mb-2" : ""}`}>
        <div
          className={`flex select-none px-5 mr-10 ${
            userLikes ? "text-red-500" : themes["black"].textSecondary
          } hover:text-red-500 cursor-pointer`}
          onClick={(e) => {
            e.preventDefault(); // prevents the link from redirecting
            if (userID === null) {
              navigate("/login");
              return;
            }

            if (userLikes) {
              // unlike post
              delete_like(statusProps.statusID, userID);
              setUserLikes(false);
              setLikeCount(likeCount - 1);
            } else {
              // like post
              post_like(statusProps.statusID, userID);
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
            replyOpened ? "text-blue-500" : themes["black"].textSecondary
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
      {replyOpened || forceOpenReply ? (
        <div
          className={`${
            partitionCompose ? `border-t ${themes["black"].border}` : ""
          }`}
        >
          <ComposeStatus placeholder="Post your reply!" buttonText="Reply" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionRow;
