import { useEffect, useState } from "react";
import { process_date_time } from "./utils";
import { UserAPIProps, StatusAPIProps, get_user_by_id } from "./api_endpoints";
import { Link } from "react-router-dom";

// todo replace with nullable type?
const MISSING_USER: UserAPIProps = {
  userID: "",
  nameHandle: "",
  nameDisplay: "",
  pfp: "",
  banner: "",
  bio: "",
};

const Post = (props: StatusAPIProps): JSX.Element => {
  const [authorInfo, setAuthorInfo] = useState<UserAPIProps>(MISSING_USER);

  // Fetch author info from server
  useEffect(() => {
    get_user_by_id(props.userID).then((result) => {
      setAuthorInfo(result);
    });
  }, [props.userID]);

  if (authorInfo === MISSING_USER) {
    return <></>;
  }

  return (
    <>
      <div id="ex-post" className="flex py-2 pr-3 border-b border-neutral-700">
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
          <div id="actions">--action row--</div>
        </div>
      </div>
    </>
  );
};

export default Post;
