import { useEffect, useState } from "react";
import { process_date_time } from "./utils";
import { GET_USER_ID, UserAPIProps, StatusAPIProps } from "./api_endpoints";
import { Link } from "react-router-dom";

const MISSING_USER: UserAPIProps = {
  userID: "",
  nameHandle: "",
  nameDisplay: "",
  bio: "",
};

const Post = (props: StatusAPIProps): JSX.Element => {
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps>(MISSING_USER);

  // Fetch author info from server
  useEffect(() => {
    fetch(`${GET_USER_ID}${props.userID}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 1) {
          throw new Error(
            `User ID should be a unique primary key: ${props.userID}`
          );
        }
        if (data.length === 0) {
          setAuthorInfo(MISSING_USER);
        }

        if (data.length === 1) {
          setAuthorInfo(data[0]);
        }
      });
  }, [props.userID]);

  if (authorInfo === MISSING_USER) {
    return <></>;
  }

  return (
    <>
      <div id="ex-post" className="flex py-2 pr-3 border-b border-neutral-700">
        <div id="pfp-col" className="w-1/12"></div>
        <div id="right-col" className="flex-col w-11/12 space-y-0.5">
          <div>
            <Link to={`../${authorInfo.nameHandle}`}>
              <span className="font-semibold">{authorInfo.nameDisplay} </span>
              <span className="text-neutral-500">@{authorInfo.nameHandle}</span>
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
