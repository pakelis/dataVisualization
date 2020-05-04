import React, {useContext, createContext, useState} from 'react'

export const CustomizationContext = createContext()

export const CustomizationProvider = ({children}) => {
  const [width, setWidth] = useState(600)
  const [height, setHeight] = useState(600)
  const [textSize, setTextSize] = useState(12)
  const [leftMargin, setLeftMargin] = useState(40)
  const [rightMargin, setRightMargin] = useState(40)

  return (
    <CustomizationContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight,
        textSize,
        setTextSize,
        leftMargin,
        setLeftMargin,
        rightMargin,
        setRightMargin,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  )
}

export const useCustomizationValue = () => useContext(CustomizationContext)
