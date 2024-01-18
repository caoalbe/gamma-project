import { useEffect, useState } from "react";
import { process_date_time } from "./utils";
import { GET_USER_ID } from "./api_endpoints";
import { Link } from "react-router-dom";

interface PostProps {
  statusID: string;
  userID: string;
  text: string;
  dateTimePosted: string;
}

interface UserAPIProps {
  userID: string;
  nameHandle: string;
  nameDisplay: string;
}

const Post = (props: PostProps): JSX.Element => {
  const [authorInfo, setAuthorInfo] = useState<Array<UserAPIProps>>([]);

  // Fetch author info from server
  useEffect(() => {
    fetch(`${GET_USER_ID}${props.userID}/`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorInfo(data);
      })
      .catch((error) => {
        setAuthorInfo([]);
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
            <Link to={`../${authorInfo[0].nameHandle}`}>
              <span className="font-semibold">
                {authorInfo[0].nameDisplay}{" "}
              </span>
              <span className="text-neutral-500">
                @{authorInfo[0].nameHandle}
              </span>
            </Link>

            <span className="text-neutral-500">
              {" "}
              · {process_date_time(props.dateTimePosted)}
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
