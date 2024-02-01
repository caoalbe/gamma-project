import { Dispatch, createContext } from "react";

export interface UserContextType {
  userID: string | null;
  setUserID: Dispatch<React.SetStateAction<string | null>>;
  userHandle: string | null;
  setUserHandle: Dispatch<React.SetStateAction<string | null>>;
  userDisplay: string | null;
  setUserDisplay: Dispatch<React.SetStateAction<string | null>>;
  userPfp: string | null;
  setUserPfp: Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
