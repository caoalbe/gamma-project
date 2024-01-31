import { Dispatch, createContext } from "react";

export interface UserContextType {
  userHandle: string | null;
  setUserHandle: Dispatch<React.SetStateAction<string | null>>;
  userDisplay: string | null;
  setUserDisplay: Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
