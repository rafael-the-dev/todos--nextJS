import { useCallback, useState } from 'react'

import ShowMoreText from "react-show-more-text";

const Container = ({ checked, name }) => {
    const [ isChecked, setIsChecked ] = useState(false);

    const changeHandler = useCallback(() => setIsChecked(c => !c), []);

    return (
        <>
            <li className="bg-blue-700 border-b border-solid border-slate-700 flex items-center 
                justify-between px-4 py-4 last:border-0">
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
                        className={`ml-3 text-slate-300 grow opacity-70 ${isChecked ? "line-through" : ""}`}
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