const SERVER_URL = "http://localhost:8000/api/";

// user model
export const GET_USER_LIST = SERVER_URL + "get_user/"; // get all user data
export const GET_USER_ID = SERVER_URL + "get_user_id/"; // get user data by ID
export const GET_USER_HANDLE = SERVER_URL + "get_user_handle/"; // get user data by handle

// status model
export const GET_STATUS = SERVER_URL + "get_status/"; // get all post data
export const CREATE_STATUS = SERVER_URL + "post_status/"; // create a post

// props for views
export interface UserAPIProps {
  userID: string;
  nameHandle: string;
  nameDisplay: string;
  bio: string;
}

export interface StatusAPIProps {
  statusID: string;
  userID: string;
  text: string;
  dateTimePosted: string;
}
