import classNames from 'classnames';
import { AppContext } from 'src/context/AppContext'
import { useCallback, useContext, useMemo, useRef, useState } from 'react'

const Container = () => {
    const { todos, fetchTodos } = useContext(AppContext);

    const [ value, setValue ] = useState("");

    const inputRef = useRef(null);
    const checkboxRef = useRef(null);

    const saveTodo = useCallback(async (event) => {
        event.preventDefault();

        const todo = {
            isComplete: checkboxRef.current.checked || false,
            name: inputRef.current.value
        };

        try {
            await fetch("/api/todos", {
                body: JSON.stringify(todo),
                method: "POST"
            });

            checkboxRef.current.checked = false;
            inputRef.current.value = "";

            setValue("")

            fetchTodos();
        } catch(err) {
            console.log(err)
        }

    }, [ fetchTodos ]);

    const labelMemo = useMemo(() => (
        <label className='check-container'>
            <input 
                className=''
                ref={checkboxRef}
                type="checkbox" 
            />
            <span className="checkmark"></span>
        </label>
    ), [])

    const inputMemo = useMemo(() => (
        <input 
            className="bg-transparent grow text-base px-4 py-3 outline-none dark:text-slate-200
            text-blue-700" 
            placeholder='Create a new todo...'
            onChange={event => setValue(event.target.value)}
            ref={inputRef}
        />
    ), []);

    return (
        <form onSubmit={saveTodo} className="dark:bg-blue-700 flex items-center px-4 py-1 bg-slate-200">
            { labelMemo }
            { inputMemo }
            { value && <button 
                aria-label='submit' 
                className={classNames("send-button fa fa-send text-slate-200 px-3 py-2 text-sm")}
                type='submit'>
                Submit
                </button>
            }
        </form>
    );
};

export default Container;