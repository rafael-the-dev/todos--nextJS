import { useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ShowMoreText from "react-show-more-text";

import { AppContext } from 'src/context/AppContext';
import { ItemsTypes } from "src/config"

const Container = ({ ID, isActive, name, position }) => {
    //const [ isChecked, setIsChecked ] = useState(!Boolean(isActive));
    const { fetchTodos } = useContext(AppContext)
    const isChecked = !Boolean(isActive);
    //setIsChecked(c => !c)

    console.log(ItemsTypes)

    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: ItemsTypes.TODOS_ITEM,
          item: { position },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        [ position ]
    );

    const [collectedProps, drop] = useDrop(() => ({
        accept: [ ItemsTypes.TODOS_ITEM ],
        drop: (item) => {
                console.log(item);
                
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
      )

    const changeHandler = async () => {
        try {
            await fetch(`/api/todos/${ID}`, {
                body: JSON.stringify({ isActive: Boolean(isActive) ? 0 : 1, name, position }),
                method: "PATCH"
            })
            fetchTodos();
        } catch(err) {
            console.log(err)
        }
    };

    const deleteTodo = async() => {
        await fetch(`/api/todos/${ID}`, {
            method: "DELETE"
        });
        fetchTodos();
    };

    return (
        <>
            <li className="dark:bg-blue-700 border-b border-solid border-slate-400 dark:border-slate-700 flex items-center 
                justify-between px-4 py-4 last:border-0 bg-slate-200"
                ref={drop}>
                <div className='flex items-center grow pr-3'>
                    <label className='check-container'>
                        <input 
                            className=''
                            type="checkbox" 
                            checked={isChecked}
                            onChange={changeHandler}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <ShowMoreText 
                        className={`ml-3 dark:text-slate-300 grow opacity-70 text-blue-700 dark:opacity-90 ${isChecked ? "line-through" : ""}`}
                        component="label"
                            lines={1}
                            more='Read more'
                            less='Read less'
                            anchorClass='my-anchor-css-class'
                            expanded={false}
                        >
                            { name }
                    </ShowMoreText>
                </div>
                <button 
                    aria-label="delete" 
                    className="bg-center bg-no-repeat item__button hover:bg-red-600 hover:p-3" 
                    onClick={deleteTodo}>
                </button>
                <button ref={dragRef}></button>
            </li>
            <style jsx>
                {`
                    .item__button {
                        background-image: url(/images/icon-cross.svg);
                        height: 12px;
                        width: 12px;
                    }
                `}
            </style>
        </>
    );
};

export default Container;