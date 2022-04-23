import { createContext, useCallback, useEffect, useRef, useState } from "react";


export const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState({ isDarkTheme: false });
    //const htmlRef = useRef();

    const toggleTheme = useCallback(() => setTheme(oldTheme => ({ isDarkTheme: !oldTheme.isDarkTheme })), []);

    useEffect(() => {
        if(theme.isDarkTheme) {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};