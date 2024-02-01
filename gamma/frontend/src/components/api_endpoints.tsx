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
}

export interface StatusAPIProps {
  statusID: string;
  userID: string;
  text: string;
  media1: string;
  dateTimePosted: string;
}

// async functions to ping server
// get posts
export const get_post = async (): Promise<StatusAPIProps[]> => {
  try {
    const res = await fetch(`${GET_STATUS}/`);
    return res.json();
  } catch (error) {
    throw new Error("http error fetching status database");
  }
};

// get user data by id
export const get_user_by_id = async (userID: string): Promise<UserAPIProps> => {
  try {
    // todo: handle more than 1 returned user
    const res = await fetch(`${GET_USER_ID}/${userID}/`)
      .then((res) => res.json())
      .then((res) => res[0]);
    return res;
  } catch (error) {
    throw new Error("http error fetching user database by id");
  }
};

// get user data by handle
export const get_user_by_handle = async (
  userHandle: string
): Promise<UserAPIProps> => {
  try {
    // todo: handle more than 1 returned user
    const res = await fetch(`${GET_USER_HANDLE}/${userHandle}/`)
      .then((res) => res.json())
      .then((res) => res[0]);
    return res;
  } catch (error) {
    throw new Error("http error fetching user database by handle");
  }
};

// user login
// todo: implement this with some secure authentication
export const api_login = async (
  handle: string,
  password: string
): Promise<UserAPIProps> => {
  try {
    // todo: handle more than 1 returned user
    const res = await fetch(`${GET_USER_LOGIN}/${handle}/${password}/`)
      .then((res) => res.json())
      .then((res) => res[0]);
    return res;
  } catch (error) {
    throw new Error("error logging in");
  }
};

// Create new Status
export const post_status = async (
  userID: string,
  text: string,
  media1: string | null
) => {
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
};
