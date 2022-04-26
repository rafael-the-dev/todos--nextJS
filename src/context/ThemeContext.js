import { createContext, useCallback, useEffect, useRef, useState } from "react";


export const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

export const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState({ isDarkTheme: false });
    //const htmlRef = useRef();

    const toggleTheme = useCallback(() => setTheme(oldTheme => ({ isDarkTheme: !oldTheme.isDarkTheme })), []);
    const localStorageName = useRef("__todo-app");

    useEffect(() => {
        const savedTheme = localStorage.getItem(localStorageName.current);
        if(savedTheme === null) {
            localStorage.setItem(localStorageName.current, JSON.stringify({ isDarkTheme: false }));
        } else {
            setTheme(JSON.parse(savedTheme));
        }
    }, []);

    useEffect(() => {
        if(theme.isDarkTheme) {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
        
        localStorage.setItem(localStorageName.current, JSON.stringify(theme));
    }, [ theme ]);

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};