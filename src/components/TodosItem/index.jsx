import { useContext, useState } from 'react'

import ShowMoreText from "react-show-more-text";

import { AppContext } from 'src/context/AppContext';

const Container = ({ ID, isActive, name, position }) => {
    //const [ isChecked, setIsChecked ] = useState(!Boolean(isActive));
    const { fetchTodos } = useContext(AppContext)
    const isChecked = !Boolean(isActive);
    //setIsChecked(c => !c)
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

    return (
        <>
            <li className="dark:bg-blue-700 border-b border-solid border-slate-400 dark:border-slate-700 flex items-center 
                justify-between px-4 py-4 last:border-0 bg-slate-200">
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
                <button aria-label="delete" className="bg-center bg-no-repeat item__button"></button>
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