import React, { createContext, useState, useEffect } from 'react';
import { getData } from '../Utils/storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getData('user');
      const token = await getData('authToken'); // ✅ use correct key

      console.log('Loaded user:', storedUser);
      console.log('Loaded token:', token);

      if (storedUser) setUser(storedUser);
      if (token) setAuthToken(token);
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, authToken, setAuthToken }}>
      {children}
    </UserContext.Provider>
  );
};
