import React, {useContext, useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const {isLoading, loginWithRedirect, logout, user, isAuthenticated} =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    console.log({isAuthenticated, user, isLoading});
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{isLoading, loginWithRedirect, logout, myUser, isAuthenticated}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
