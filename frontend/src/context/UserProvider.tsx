import React, { useState } from "react";
import { UserContext } from "./userContext";

interface User {
  role: string;
  isAuthenticated: boolean;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    role: "",
    isAuthenticated: false,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
