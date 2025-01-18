import { createContext } from "react";

interface User {
  role: string;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
