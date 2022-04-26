import { useContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Head from 'next/head'
import { ThemeContext } from 'src/context/ThemeContext'
import { AppContext } from 'src/context/AppContext'

import TodosItem from "src/components/TodosItem"

import styles from 'src/styles/home.module.css'
import classNames from 'classnames'

const Container = () => {
    const { toggleTheme } = useContext(ThemeContext);
    const { todos, fetchTodos } = useContext(AppContext);

    const [ filteredTodos , setFilteredTodos ] = useState([]);
    const [ filterKey, setFilterKey ] = useState("");

    const sortList = useMemo(() => filteredTodos.sort((a, b) => {
        return a.position - b.position;
    }), [ filteredTodos ]);

    const itemsNotCompleted = useMemo(() => {
        return filteredTodos.filter(todo => Boolean(todo.isActive)).length
    }, [ filteredTodos])

    const clickHandler = useCallback(prop => () => setFilterKey(prop), []);

    const inputRef = useRef(null);
    const checkboxRef = useRef(null);
    const deleteCompletedTodos = useCallback(async () => {
        try {
            await fetch("/api/todos?filter=completed", {
                method: "DELETE"
            });

            fetchTodos();
        } catch(err) {
            console.log(err)
        }
    }, [ fetchTodos ])
    const saveTodo = useCallback(async (event) => {
        event.preventDefault();

        const todo = {
            isActive: checkboxRef.current.checked ? 0 : 1,
            name: inputRef.current.value
        };

        try {
            await fetch("/api/todos", {
                body: JSON.stringify(todo),
                method: "POST"
            });

            checkboxRef.current.checked = false;
            inputRef.current.value = "";

            fetchTodos();
        } catch(err) {
            console.log(err)
        }

    }, [ fetchTodos ])

    useEffect(() => {
        switch(filterKey) {
            case "COMPLETE": {
                setFilteredTodos(todos.filter(todo => !Boolean(todo.isActive)));
                break;
            }
            case "ACTIVE": {
                setFilteredTodos(todos.filter(todo => Boolean(todo.isActive)));
                break;
            }
            default: {
                setFilteredTodos(todos);
            }
        }
    }, [ filterKey, todos ]);
    
    return (
        <div>
            <div className={classNames("bg-no-repeat app sm:dark:bg-blue-900", styles.app)}>
                <Head title="Home" />
                <header className="bg-center bg-cover bg-no-repeat px-[5%] pt-6 header sm:pt-12">
                    <div className="flex justify-between items-center sm:mx-auto sm:max-w-[450px] md:max-w-[550px]">
                        <h1 className="font-bold text-slate-200 text-2xl uppercase header__title">
                            Todo
                        </h1>
                        <button 
                            aria-label="theme toggle" 
                            className="bg-center bg-no-repeat header__toggle-button"
                            onClick={toggleTheme}></button>
                    </div>
                </header>
                <main className="main px-[5%] dark:bg-blue-900 sm:dark:bg-transparent">
                    <div className="container sm:mx-auto sm:max-w-[450px] md:max-w-[550px]">
                        <form onSubmit={saveTodo} className="dark:bg-blue-700 flex items-center px-4 py-1 bg-slate-200">
                            <label className='check-container'>
                                <input 
                                    className=''
                                    ref={checkboxRef}
                                    type="checkbox" 
                                />
                                <span className="checkmark"></span>
                            </label>
                            <input 
                                className="bg-transparent grow text-base px-4 py-3 outline-none dark:text-slate-200
                                text-blue-700" 
                                placeholder='Create a new todo...'
                                ref={inputRef}
                            />
                        </form>
                        <div>
                            <ul className='mt-12'>
                                { 
                                    sortList.map((item, index) => <TodosItem key={index} { ...item} />)
                                }
                                <li className="dark:bg-blue-700 border-b border-solid dark:border-slate-700 
                                    flex items-center justify-between px-4 py-4 last:border-0 bg-slate-200">
                                    <span className="dark:text-slate-300 dark:opacity-40 text-slate-500">
                                        { itemsNotCompleted } item(s) left
                                    </span>
                                    <button className="capitalize dark:text-slate-300 dark:opacity-40 
                                        dark:hover:text-white hover:opacity-100 text-slate-500 
                                        hover:text-red-700 hover:font-bold"
                                        onClick={deleteCompletedTodos}>
                                        Clear completed
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="dark:bg-blue-700 flex items-center justify-center mt-8 text-slate-500 
                            py-4 bg-slate-200">
                            <button 
                                className={classNames("mr-3 dark:hover:text-white hover:text-slate-700", { "text-blue-500 font-bold": filterKey === ""})}
                                onClick={clickHandler("")}>
                                All
                            </button>
                            <button 
                                className={classNames("mr-3 dark:hover:text-white hover:text-slate-700", { "text-blue-500 font-bold": filterKey === "ACTIVE"})}
                                onClick={clickHandler("ACTIVE")}>
                                Active
                            </button>
                            <button 
                                className={classNames("dark:hover:text-white hover:text-slate-700", { "text-blue-500 font-bold": filterKey === "COMPLETE"})}
                                onClick={clickHandler("COMPLETE")}>
                                Completed
                            </button>
                        </div>
                        <div className="mt-12">
                            <p className="text-center text-slate-500">Drag and drop to reorder list</p>
                        </div>
                    </div>
                </main>
            </div>

            <style jsx>{`
                .header {
                    background-image: url(/images/bg-mobile-light.jpg);
                    height: 250px;
                }

                .header__title {
                    letter-spacing: 8px;
                }

                .header__toggle-button {
                    background-image: url(/images/icon-sun.svg);
                    height: 36px;
                    width: 36px;
                }

                .main {
                    min-height: 61vh;
                }

                .container {
                    transform: translateY(-160px);
                }

                @media screen and (min-width: 600px) {
                    .header {
                        background-image: none;
                        height: auto;
                    }

                    .app {
                        background-image: url(/images/bg-desktop-light.jpg);
                        background-size: 100% 290px;
                        min-height: 100vh;
                    }

                    .main {
                        background-color: transparent;
                        margin-top: 2.4rem;
                    }

                    .container {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Container;
