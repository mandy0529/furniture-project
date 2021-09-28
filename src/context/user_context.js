import React, {useContext, useEffect, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const {isLoading, loginWithRedirect, logout, user, isAuthenticated} =
    useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(null);
    }
    // eslint-disable-next-line
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
