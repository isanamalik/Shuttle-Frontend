import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({
  user: null,
  setLoggedInUser: () => { },
});


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const setLoggedInUser = (data) => {
    setUser(data);
  };


  const checkSession = async () => {
    const userSession = await AsyncStorage.getItem("LoggedInUser");
    if (userSession) setLoggedInUser(JSON.parse(userSession));
  };

  useEffect(() => {
    checkSession();
  }, [])

  return (
    <AuthContext.Provider value={{ user, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  )
}