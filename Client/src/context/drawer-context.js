import React, { useContext, createContext, useState } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
        drawerVisible,
        setDrawerVisible
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerValue = () => useContext(DrawerContext);
