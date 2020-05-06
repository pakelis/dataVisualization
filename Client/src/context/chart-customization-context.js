import React, { useContext, createContext, useState } from "react";

export const CustomizationContext = createContext();

export const CustomizationProvider = ({ children }) => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(1200);
  const [leftMargin, setLeftMargin] = useState(5);
  const [rightMargin, setRightMargin] = useState(5);
  const [bottomMargin, setBottomMargin] = useState(5);
  const [topMargin, setTopMargin] = useState(5);

  return (
    <CustomizationContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight,
        leftMargin,
        setLeftMargin,
        rightMargin,
        setRightMargin,
        bottomMargin,
        setBottomMargin,
        topMargin,
        setTopMargin,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomizationValue = () => useContext(CustomizationContext);
