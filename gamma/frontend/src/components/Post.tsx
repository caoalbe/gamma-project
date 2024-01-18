import { useEffect, useState } from "react";
import { process_date_time } from "./utils";

interface PostProps {
  statusID: string;
  userID: string;
  text: string;
  dateTimePosted: string;
}

interface UserProps {
  userID: string;
  nameHandle: string;
  nameDisplay: string;
}

// const GET_USER_LIST = "http://localhost:8000/api/get_user/";
const GET_USER_SINGLE = "http://localhost:8000/api/get_user_id/";

const Post = (props: PostProps): JSX.Element => {
  const [authorInfo, setAuthorInfo] = useState<Array<UserProps>>([]);

  // Fetch author info from server
  useEffect(() => {
    fetch(`${GET_USER_SINGLE}${props.userID}/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthorInfo(data);
      });
  }, [props.userID]);

  // Found issue with database integrity
  if (authorInfo.length > 1) {
    throw new Error(`User ID should be a unique primary key: ${props.userID}`);
  }

  // Missing author information; dont show post
  if (authorInfo.length < 1) {
    return <></>;
  }

  return (
    <>
      <div id="ex-post" className="flex py-2 pr-3 border-b border-neutral-700">
        <div id="pfp-col" className="w-1/12"></div>
        <div id="right-col" className="flex-col w-11/12 space-y-0.5">
          <div>
            <span>
              {authorInfo[0].nameDisplay} @{authorInfo[0].nameHandle} ·{" "}
              {process_date_time(props.dateTimePosted)}
            </span>
            <br />
            <span>{props.text}</span>
          </div>
          <div id="actions">--action row--</div>
        </div>
      </div>
    </>
  );
};

export default Post;
