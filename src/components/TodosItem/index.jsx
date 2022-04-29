import { useContext, useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ShowMoreText from "react-show-more-text";

import { AppContext } from 'src/context/AppContext';
import { ItemsTypes } from "src/config"

const Container = ({ ID, isComplete, task, position }) => {
    //const [ isChecked, setIsChecked ] = useState(!Boolean(isActive));
    const { fetchTodos } = useContext(AppContext)
    const isChecked = isComplete;

    const [collected, dragRef] = useDrag(
        () => ({
          type: ItemsTypes.TODOS_ITEM,
          item: { ID, position },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          }),
          isDragging: monitor => {
            console.log()
          }
        }),
        [ ID, position ]
    );

    const switchPositions = useCallback(async ({ from, to }) => {
        try {
            await fetch(`/api/todos`, {
                body: JSON.stringify({ from, to }),
                method: "PATCH"
            })
            fetchTodos();
        } catch(err) {
            console.log(err)
        }
    }, [ fetchTodos ]);

    const [collectedProps, drop] = useDrop(() => ({
        accept: [ ItemsTypes.TODOS_ITEM ],
        drop: (item) => {
                switchPositions({ from: item, to: { ID, position }})
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [ ID, position, switchPositions ]
      )

    const changeHandler = async () => {
        try {
            await fetch(`/api/todos/${ID}`, {
                body: JSON.stringify({ isComplete: !isComplete, task, position }),
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
                            { task }
                    </ShowMoreText>
                </div>
                <button aria-label='drag and drop' className="drag-button flex flex-col" ref={dragRef}>
                    <span className='drag-button__line dark:opacity-70'></span>
                    <span className='drag-button__line dark:opacity-70'></span>
                </button>
                <button 
                    aria-label='delete todo' 
                    className="hover:text-red-600 fa fa-close text-xl text-blue-600" 
                    onClick={deleteTodo}>
                </button>
            </li>
            <style jsx>
                {`
                    .item__button {
                        background-image: url(/images/icon-cross.svg);
                        height: 12px;
                        width: 12px;
                    }

                    .drag-button {
                        margin-right: 17px;
                    }

                    .drag-button:hover .drag-button__line {
                        background-color: #009fb1;
                    }

                    .drag-button__line {
                        background-color: #CCC;
                        height: 3px;
                        margin-bottom: 3px;
                        width: 24px;
                    }

                    .drag-button__line:last-child, .delete-button__line:last-child {
                        margin-bottom: 0;
                    }

                    .delete-button__line {
                        height: 3px;
                        margin-bottom: 3px;
                        width: 20px;
                    }

                    .delete-button__line:first-child {
                        transform: rotate(70deg);
                    }

                    .delete-button__line:last-child {
                        transform: rotate(-70deg);
                    }
                `}
            </style>
        </>
    );
};

export default Container;