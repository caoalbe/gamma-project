import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserAPIProps,
  StatusAPIProps,
  get_post,
  get_user_by_id,
} from "../components/api_endpoints";
import PageWrapper from "../components/PageWrapper";
import { themes } from "../components/theme";
import Reply from "../components/Reply";
import ComposeStatus from "../components/ComposeStatus";
import ActionRow from "../components/ActionRow";

const Status = (): JSX.Element => {
  const { statusID } = useParams();
  const [statusInfo, setStatusInfo] = useState<StatusAPIProps | null>(null);
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps | null>(null);
  const [replyStatusInfo, setReplyStatusInfo] = useState<StatusAPIProps | null>(
    null
  );
  const [replyAuthorInfo, setReplyAuthorInfo] = useState<UserAPIProps | null>(
    null
  );

  // fetch data for the post
  useEffect(() => {
    get_post()
      .then((all_posts: StatusAPIProps[]) =>
        // todo: make dedicated query for this instead of frontend filter
        all_posts.filter((post: StatusAPIProps) => post.statusID === statusID)
      )
      .then((all_posts: StatusAPIProps[]) => {
        if (all_posts.length === 0) {
          return null;
        }
        setStatusInfo(all_posts[0]);
      });
  }, [statusID]);

  // fetch data for author
  useEffect(() => {
    if (statusInfo === null) {
      setAuthorInfo(null);
      return;
    }
    get_user_by_id(statusInfo.userID).then((res: UserAPIProps | null) => {
      if (res === null) {
        setAuthorInfo(null);
      }

      setAuthorInfo(res);
    });
  }, [statusInfo]);

  // fetch data for reply post
  useEffect(() => {
    if (statusInfo === null || statusInfo.replyID === null) {
      // need to reset state because
      // opening a new status page
      // (ex: /status/1234 -- > /status/abcd)
      // is technically the same page; so state is preserved
      setReplyStatusInfo(null);
      return;
    }

    get_post()
      .then((all_posts: StatusAPIProps[]) =>
        // todo: make dedicated query for this instead of frontend filter
        all_posts.filter(
          (post: StatusAPIProps) => post.statusID === statusInfo.replyID
        )
      )
      .then((all_posts: StatusAPIProps[]) => {
        if (all_posts.length === 0) {
          return null;
        }
        setReplyStatusInfo(all_posts[0]);
      });
  }, [statusInfo]);

  // fetch data for reply author
  useEffect(() => {
    if (replyStatusInfo === null) {
      setReplyAuthorInfo(null);
      return;
    }

    get_user_by_id(replyStatusInfo.userID).then((res: UserAPIProps | null) => {
      if (res === null) {
        setReplyAuthorInfo(null);
      }

      setReplyAuthorInfo(res);
    });
  }, [replyStatusInfo]);

  return (
    <PageWrapper>
      {statusInfo === null || authorInfo === null ? (
        <>
          <div className="text-white">post not available</div>
        </>
      ) : (
        <>
          <div
            className={`text-xl ${themes["black"].textPrimary} font-bold ${themes["black"].border} border-b pl-3 py-3`}
          >
            Post
          </div>
          <div
            className={`pl-4 pr-4 pb-5 mt-1 border-b ${themes["black"].border}`}
            id="main-status"
          >
            <div className="flex mb-3">
              <div id="pfp" className="w-1/12 p-1">
                <Link to={`../${authorInfo.nameHandle}`}>
                  <img
                    src={authorInfo.pfp}
                    className="aspect-square rounded-full"
                    alt="pfp"
                  />
                </Link>
              </div>
              <div id="name" className="pl-2 align-middle">
                <Link to={`../${authorInfo.nameHandle}`}>
                  <span
                    className={`${themes["black"].textPrimary} font-semibold decoration-1 hover:underline leading-tight`}
                  >
                    {authorInfo.nameDisplay}
                  </span>
                  <br />
                  <span
                    className={`${themes["black"].textSecondary} leading-tight`}
                  >
                    @{authorInfo.nameHandle}
                  </span>
                </Link>
              </div>
            </div>
            <div id="text" className={`${themes["black"].textPrimary} text-xl`}>
              {statusInfo.text}
            </div>
            {statusInfo.media1 === null ? (
              <></>
            ) : (
              <div id="img">
                <img
                  src={statusInfo.media1}
                  className="rounded-lg w-10/12 mt-2 mx-auto"
                  alt="media 1"
                />
              </div>
            )}
            {replyStatusInfo === null || replyAuthorInfo === null ? (
              <></>
            ) : (
              <Reply author={replyAuthorInfo} status={replyStatusInfo} />
            )}
            <div
              className={`mt-2 ${themes["black"].textSecondary} border-b ${themes["black"].border} pb-2`}
            >
              2:13 . Feb 9, 2024
            </div>
            <div className={`text-white ${themes["black"].border} mt-2`}>
              <ActionRow statusProps={statusInfo} forceOpenReply />
            </div>
            {/* <div className={``}>
              <ComposeStatus placeholder="Post your reply" buttonText="Reply" />
            </div> */}
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default Status;
