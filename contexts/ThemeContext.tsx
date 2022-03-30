import React, { useState } from "react";
import Theme from "../constants/ColorMode";
import { themeContext, props, theme, PreferredTheme} from '../constants/types'

export const ThemeContext = React.createContext<themeContext>({} as themeContext);


function ThemeContextProvider(props:props) {

    const [theme, setTheme] = useState<theme>("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
      };  
      const preferredTheme:PreferredTheme = (theme == "dark")?Theme.darkmode:Theme.lightmode;
 

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, preferredTheme }}>
        {
            props.children
        }
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider