import { createContext, useCallback, useEffect, useState } from 'react'

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const AppContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([]);

    const fetchTodos = useCallback(() => {
        fetch("/api/todos")
            .then(res => res.json())
            .then(data => setTodos(data.todos))
            .catch(console.log);
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [ fetchTodos ])

    return (
        <AppContext.Provider value={{ fetchTodos, todos }}>
            { children }
        </AppContext.Provider>
    );
};