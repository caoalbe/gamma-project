import { Link } from "react-router-dom";
import { StatusAPIProps, UserAPIProps } from "./api_endpoints";
import { themes } from "./theme";
import { process_date_time } from "./utils";

interface ReplyProps {
  author: UserAPIProps;
  status: StatusAPIProps;
}

const Reply = (props: ReplyProps): JSX.Element => {
  return (
    <Link to={`../status/${props.status.statusID}`}>
      <div
        id="reply-post"
        className={`border ${themes["black"].border} rounded-xl flex p-2 mt-2`}
      >
        <div className="">
          <img
            src={props.author.pfp}
            className="h-6 aspect-square rounded-full inline"
            alt="pfp"
          />

          <span
            className={`font-semibold leading-tight ${themes["black"].textPrimary}`}
          >
            {" "}
            {props.author.nameDisplay}
          </span>
          <span className={`${themes["black"].textSecondary} leading-tight`}>
            {" "}
            @{props.author.nameHandle}
          </span>

          <span className={`${themes["black"].textSecondary} leading-tight`}>
            {" "}
            · {process_date_time(props.status.dateTimePosted)}
          </span>
          <br />
          <span className={`${themes["black"].textPrimary}`}>
            {props.status.text}
          </span>
          {props.status.media1 === null ? (
            <></>
          ) : (
            <>
              <img
                src={props.status.media1}
                className="rounded-lg w-7/12 mt-2 mx-auto"
                alt="media 1"
              />
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Reply;
