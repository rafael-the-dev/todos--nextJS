import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext();
AppContext.displayName = "AppContext";

export const AppContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState([]);

    useEffect(() => {
        const fetchTodos = () => {
            fetch("/api/todos")
                .then(res => res.json())
                .then(data => setTodos(data.todos))
                .catch(console.log);
        };
        fetchTodos();
    }, [])

    return (
        <AppContext.Provider value={{ todos }}>
            { children }
        </AppContext.Provider>
    );
};