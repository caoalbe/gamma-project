import { createContext } from "react";

export interface UserContextType {
  user: string;
  setUser: React.SetStateAction<string>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);
