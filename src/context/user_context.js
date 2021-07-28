import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user, isLoading, error } = useAuth0();
  return (
    <UserContext.Provider
      value={{ loginWithRedirect, logout, user, isLoading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
