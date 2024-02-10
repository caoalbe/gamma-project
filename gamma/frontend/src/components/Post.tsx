import { useEffect, useState } from "react";
import { process_date_time } from "./utils";
import {
  UserAPIProps,
  StatusAPIProps,
  get_user_by_id,
  get_post,
} from "./api_endpoints";
import { Link } from "react-router-dom";
import { themes } from "./theme";
import Reply from "./Reply";
import ActionRow from "./ActionRow";

const Post = ({
  statusInfo,
  hideReply = false,
}: {
  statusInfo: StatusAPIProps;
  hideReply?: boolean;
}): JSX.Element => {
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps | null>(null);

  // Replying To
  const [parentStatus, setParentState] = useState<StatusAPIProps | null>(null);
  const [parentAuthorInfo, setParentAuthorInfo] = useState<UserAPIProps | null>(
    null
  );

  // Fetch author info from server
  useEffect(() => {
    get_user_by_id(statusInfo.userID).then((result) => {
      setAuthorInfo(result);
    });
  }, [statusInfo.userID]);

  // Fetch parent post info from server
  useEffect(() => {
    if (statusInfo.replyID === null) {
      return;
    }

    get_post()
      .then((result: StatusAPIProps[]) =>
        result.filter(
          (entry: StatusAPIProps) => entry.statusID === statusInfo.replyID
        )
      )
      .then((result: StatusAPIProps[]) => {
        if (result.length === 0) {
          // todo: post was deleted
          return;
        }
        setParentState(result[0]);
      });
  }, [statusInfo.replyID]);

  // Fetch account info of parent poster
  useEffect(() => {
    if (parentStatus === null) {
      return;
    }
    get_user_by_id(parentStatus.userID).then((result) => {
      setParentAuthorInfo(result);
    });
  }, [parentStatus]);

  if (authorInfo === null) {
    return <></>;
  }

  return (
    <>
      <Link to={`../status/${statusInfo.statusID}`}>
        <div
          id="post"
          className={`flex py-2 pr-3 border-b ${themes["black"].border} hover:${themes["black"].bgHover} duration-300`}
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
                <span
                  className={`font-semibold decoration-1 hover:underline leading-tight ${themes["black"].textPrimary}`}
                >
                  {authorInfo.nameDisplay}
                </span>
                <span
                  className={`${themes["black"].textSecondary} leading-tight`}
                >
                  {" "}
                  @{authorInfo.nameHandle}
                </span>
              </Link>

              <span
                className={`${themes["black"].textSecondary} leading-tight`}
              >
                {" "}
                · {process_date_time(statusInfo.dateTimePosted)}
              </span>
              <br />
              <span className={`${themes["black"].textPrimary}`}>
                {statusInfo.text}
              </span>
              {statusInfo.media1 === null ? (
                <></>
              ) : (
                <>
                  <img
                    src={statusInfo.media1}
                    className="rounded-lg w-10/12 mt-2 mx-auto"
                    alt="media 1"
                  />
                </>
              )}
            </div>
            {parentStatus === null || parentAuthorInfo === null || hideReply ? (
              <></>
            ) : (
              <Reply author={parentAuthorInfo} status={parentStatus} />
            )}
            <ActionRow statusProps={statusInfo} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
