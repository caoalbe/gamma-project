import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserAPIProps,
  StatusAPIProps,
  get_post,
  get_user_by_id,
  get_post_statusID,
} from "../components/api_endpoints";
import PageWrapper from "../components/PageWrapper";
import { themes } from "../components/theme";
import Reply from "../components/Reply";
import ActionRow from "../components/ActionRow";
import Post from "../components/Post";

const Status = (): JSX.Element => {
  const { statusID } = useParams();
  const [statusInfo, setStatusInfo] = useState<StatusAPIProps | null>(null);
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps | null>(null);

  // what this status is replying to
  const [parentStatusInfo, setParentStatusInfo] =
    useState<StatusAPIProps | null>(null);
  const [parentAuthorInfo, setParentAuthorInfo] = useState<UserAPIProps | null>(
    null
  );

  // replies for this status
  const [replyStatusInfo, setReplyStatusInfo] = useState<StatusAPIProps[]>([]);

  // fetch data for the post
  useEffect(() => {
    if (statusID === null) {
      return;
    }

    get_post_statusID(statusID as string).then(
      (post: StatusAPIProps | null) => {
        setStatusInfo(post);
      }
    );
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

  // fetch data for parent post
  useEffect(() => {
    if (statusInfo === null || statusInfo.replyID === null) {
      // need to reset state because
      // opening a new status page
      // (ex: /status/1234 -- > /status/abcd)
      // is technically the same page; so state is preserved
      setParentStatusInfo(null);
      return;
    }

    get_post_statusID(statusInfo.replyID).then(
      (parent: StatusAPIProps | null) => {
        setParentStatusInfo(parent);
      }
    );
  }, [statusInfo]);

  // fetch data for parent author
  useEffect(() => {
    if (parentStatusInfo === null) {
      setParentAuthorInfo(null);
      return;
    }

    get_user_by_id(parentStatusInfo.userID).then((res: UserAPIProps | null) => {
      if (res === null) {
        setParentAuthorInfo(null);
      }

      setParentAuthorInfo(res);
    });
  }, [parentStatusInfo]);

  // fetch data for replies
  useEffect(() => {
    get_post()
      .then((all_posts: StatusAPIProps[]) =>
        all_posts.filter((post: StatusAPIProps) => post.replyID === statusID)
      )
      .then((all_replies: StatusAPIProps[]) => {
        setReplyStatusInfo(all_replies);
      });
  }, [statusID]);

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
            {parentStatusInfo === null || parentAuthorInfo === null ? (
              <></>
            ) : (
              <Reply author={parentAuthorInfo} status={parentStatusInfo} />
            )}
            <div
              className={`mt-2 ${themes["black"].textSecondary} border-b ${themes["black"].border} pb-2`}
            >
              2:13 . Feb 9, 2024 . TODO
            </div>
            <div className={`text-white ${themes["black"].border} mt-2`}>
              {/* todo: add pfp next to reply */}
              <ActionRow
                statusProps={statusInfo}
                forceOpenReply
                partitionCompose
              />
            </div>
          </div>
          {replyStatusInfo.map((reply: StatusAPIProps) => (
            <Post statusInfo={reply} hideReply />
          ))}
        </>
      )}
    </PageWrapper>
  );
};

export default Status;
