import { useCallback, useState } from 'react'

const Container = ({ checked, name }) => {
    const [ isChecked, setIsChecked ] = useState(false);

    const changeHandler = useCallback(() => setIsChecked(c => !c), []);

    return (
        <>
            <li className="bg-blue-700 border-b border-solid border-slate-600 flex items-center 
                justify-between px-4 py-4 last:border-0">
                <div className='flex items-center'>
                    <label className='check-container'>
                        <input 
                            className=''
                            type="checkbox" 
                            checked={isChecked}
                            onChange={changeHandler}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className={`ml-3 text-slate-300 opacity-70 ${isChecked ? "line-through" : ""}`}>
                        { name }
                    </label>
                </div>
                <button aria-label="delete" className="bg-center bg-no-repeat item__button"></button>
            </li>
            <style jsx>
                {`
                    .item__button {
                        background-image: url(/images/icon-cross.svg);
                        height: 15px;
                        width: 15px;
                    }
                `}
            </style>
        </>
    );
};

export default Container;