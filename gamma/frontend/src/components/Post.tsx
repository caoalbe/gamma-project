interface PostProps {
  nameDisplay: string;
  nameHandle: string;
  postText: string;
  date: string; // TODO: use some datetime class
}

const Post = (props: PostProps): JSX.Element => (
  <>
    <div id="ex-post" className="flex py-2 pr-3 border-b">
      <div id="pfp-col" className="w-1/12"></div>
      <div id="right-col" className="flex-col w-11/12 space-y-0.5">
        <div>
          <span>
            {props.nameDisplay} @{props.nameHandle} · {props.date}
          </span>
          <br />
          <span>{props.postText}</span>
        </div>
        <div id="actions">--buttons row--</div>
      </div>
    </div>
  </>
);

export default Post;
