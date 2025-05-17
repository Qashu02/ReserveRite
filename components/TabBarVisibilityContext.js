import React, { createContext, useState, useContext } from "react";

const TabBarVisibilityContext = createContext();

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);

export const TabBarVisibilityProvider = ({ children }) => {
  const [tabVisible, setTabVisible] = useState(true);
  const toggleTabVisibility = () => setTabVisible((prev) => !prev);

  return (
    <TabBarVisibilityContext.Provider value={{ tabVisible, toggleTabVisibility }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};
