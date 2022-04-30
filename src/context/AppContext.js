import { createContext, useCallback, useEffect, useState } from 'react'

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const AppContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    const stopLoading = useCallback(() => setIsLoading(false), []);
    const startLoading = useCallback(() => setIsLoading(true), []);

    const fetchTodos = useCallback(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(data => setTodos(data.todos))
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [ fetchTodos ])

    return (
        <AppContext.Provider value={{ fetchTodos, isLoading, startLoading, stopLoading, todos }}>
            { children }
        </AppContext.Provider>
    );
};