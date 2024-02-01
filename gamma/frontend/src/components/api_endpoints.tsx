const SERVER_URL = "http://localhost:8000/api/";

// note: all requests must end with a "/"
// user model
const GET_USER_LIST = SERVER_URL + "get_user"; // get all user data
const GET_USER_ID = SERVER_URL + "get_user_id"; // get user data by ID
const GET_USER_HANDLE = SERVER_URL + "get_user_handle"; // get user data by handle
const GET_USER_LOGIN = SERVER_URL + "get_user_login"; // get user with matching handle and password

// status model
const GET_STATUS = SERVER_URL + "get_status"; // get all post data
const CREATE_STATUS = SERVER_URL + "post_status"; // create a post

// following model
const GET_FOLLOWING_SINGLE = SERVER_URL + "get_following_single"; // check if a following exists
const GET_FOLLOWING = SERVER_URL + "get_following"; // get list of following
const GET_FOLLOWER = SERVER_URL + "get_follower"; // get list of followers

// like model
const GET_LIKE = SERVER_URL + "get_like"; // check if like exists
const CREATE_LIKE = SERVER_URL + "post_like"; // like a status
const DELETE_LIKE = SERVER_URL + "delete_like"; // unlike a status

// media stuff
const GET_MEDIA = SERVER_URL;

// props for views
export interface UserAPIProps {
  userID: string;
  nameHandle: string;
  nameDisplay: string;
  pfp: string;
  banner: string;
  bio: string;
  dateTimeJoined: string;
}

export interface StatusAPIProps {
  statusID: string;
  userID: string;
  text: string;
  media1: string;
  dateTimePosted: string;
}

export interface LikeAPIProps {
  statusID: string;
  viewerID: string;
}

export interface FollowingAPIProps {
  start: string;
  end: string;
}

// async functions to ping server
function check_http(response: Response) {
  if (!response.ok) {
    throw new Error(`http error pinging server; ${response.status}`);
  }
  return response;
}

// get posts
export const get_post = async (): Promise<StatusAPIProps[]> => {
  try {
    const response = await fetch(`${GET_STATUS}/`)
      .then(check_http)
      .then((res) => res.json());
    return response;
  } catch (error) {
    throw new Error(`http error fetching status database; ${error}`);
  }
};

// get user data by id
export const get_user_by_id = async (
  userID: string
): Promise<UserAPIProps | null> => {
  if (userID === "") {
    return null;
  }
  try {
    const res = await fetch(`${GET_USER_ID}/${userID}/`)
      .then(check_http)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 1) {
          throw new Error(`userID ${userID} should be unique.`);
        }
        if (res.length === 0) {
          return null;
        }
        return res[0];
      });
    return res;
  } catch (error) {
    throw new Error(`http error fetching user database by id; ${error}`);
  }
};

// get user data by handle
export const get_user_by_handle = async (
  userHandle: string
): Promise<UserAPIProps | null> => {
  if (userHandle === "") {
    return null;
  }
  try {
    const res = await fetch(`${GET_USER_HANDLE}/${userHandle}/`)
      .then(check_http)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 1) {
          throw new Error(`userHandle ${userHandle} should be unique`);
        }
        if (res.length === 0) {
          return null;
        }
        return res[0];
      });
    return res;
  } catch (error) {
    throw new Error(`http error fetching user database by handle; ${error}`);
  }
};

// user login
// todo: implement this with some secure authentication
export const api_login = async (
  handle: string,
  password: string
): Promise<UserAPIProps | null> => {
  try {
    if (handle === "" || password === "") {
      return null;
    }
    const response = await fetch(`${GET_USER_LOGIN}/${handle}/${password}/`)
      .then(check_http)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 1) {
          throw new Error("login should be unique");
        }
        if (res.length === 0) {
          return null;
        }
        return res[0];
      });
    return response;
  } catch (error) {
    throw new Error(`error logging in; ${error}`);
  }
};

// Create new Status
export const post_status = async (
  userID: string,
  text: string,
  media1: string | null
): Promise<void> => {
  try {
    if (media1 === null) {
      await fetch(`${CREATE_STATUS}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: userID,
          text: text,
          // media1: null, // just leave empty instead of specifying null
        }),
      });
    } else {
      await fetch(`${CREATE_STATUS}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: userID,
          text: text,
          media1: media1,
        }),
      });
    }
  } catch (error) {
    throw new Error(`error creating status; ${error}`);
  }
};

// check if user <start> is following user <end>
export const query_follow = async (
  start: string,
  end: string
): Promise<boolean> => {
  if (start === "" || end === "") {
    return false;
  }
  try {
    const res = await fetch(`${GET_FOLLOWING_SINGLE}/${start}/${end}/`)
      .then(check_http)
      .then((res) => res.json())
      .then((res) => res.length > 0);
    return res;
  } catch (error) {
    throw new Error(`error querying a following; ${error}`);
  }
};

// get list of users that <start> is following
export const get_following = async (
  start: string
): Promise<FollowingAPIProps[]> => {
  if (start === "") {
    return [];
  }
  try {
    // this funciton returns wrong type of
    const res = await fetch(`${GET_FOLLOWING}/${start}/`)
      .then(check_http)
      .then((res) => res.json());
    return res;
  } catch (error) {
    throw new Error(`error fetching following list; ${error}`);
  }
};

// get list of users that follow <end>
export const get_follower = async (
  end: string
): Promise<FollowingAPIProps[]> => {
  if (end === "") {
    return [];
  }
  try {
    const res = await fetch(`${GET_FOLLOWER}/${end}/`)
      .then(check_http)
      .then((res) => res.json());
    return res;
  } catch (error) {
    throw new Error(`error fetching follower list; ${error}`);
  }
};

// check if like exists
export const query_like = async (
  statusID: string,
  userID: string
): Promise<boolean> => {
  if (statusID === "" || userID === "") {
    return false;
  }
  try {
    const res = await fetch(`${GET_LIKE}/${statusID}/${userID}/`)
      .then(check_http)
      .then((res) => res.json())
      .then((res) => res.length > 0);
    return res;
  } catch (error) {
    throw new Error(`error querying a like; ${error}`);
  }
};

// create new like
export const post_like = async (
  statusID: string,
  userID: string
): Promise<void> => {
  try {
    await fetch(`${CREATE_LIKE}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statusID: statusID,
        viewerID: userID,
      }),
    });
  } catch (error) {
    throw new Error(`error liking a status; ${error}`);
  }
};

// delete a like
export const delete_like = async (
  statusID: string,
  userID: string
): Promise<void> => {
  try {
    await fetch(`${DELETE_LIKE}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        statusID: statusID,
        viewerID: userID,
      }),
    });
  } catch (error) {
    throw new Error(`error deleting a like; ${error}`);
  }
};
