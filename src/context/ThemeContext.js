import { createContext, useEffect, useRef, useState } from "react";


export const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState({ isDarkTheme: false });
    const htmlRef = useRef(document.querySelector("html"));

    const toggleTheme = useCallback(() => setTheme(oldTheme => ({ isDarkTheme: !oldTheme.isDarkTheme })), []);

    useEffect(() => {
        if(theme.isDarkTheme) {
            htmlRef.current.classList.add("dark");
        } else {
            htmlRef.current.classList.remove("dark");
        }
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};