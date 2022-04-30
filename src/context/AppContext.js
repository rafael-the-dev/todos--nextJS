import { createContext, useCallback, useEffect, useState } from 'react'

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const AppContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const stopLoading = useCallback(() => setIsLoading(false), []);
    const startLoading = useCallback(() => setIsLoading(true), []);

    const errorHandler = useCallback((func) => {
        try {
            func();
        } catch(err) {
            stopLoading();
            console.log(err)
        }
    }, []);

    const fetchTodos = useCallback(() => {
        errorHandler(async () => {
            startLoading();
            const res = await fetch("/api/todos");
            const data = await res.json();
            setTodos(data.todos);
            stopLoading();
        });
    }, [ errorHandler, startLoading, stopLoading ]);

    useEffect(() => {
        fetchTodos();
    }, [ fetchTodos ])

    return (
        <AppContext.Provider value={{ errorHandler, fetchTodos, isLoading, startLoading, stopLoading, todos }}>
            { children }
        </AppContext.Provider>
    );
};