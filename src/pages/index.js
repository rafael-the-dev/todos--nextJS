import { useId } from 'react'

import Head from 'next/head'

import TodosItem from "src/components/TodosItem"

const Container = () => {
    const list = [
        {
            checked: false,
            name: "Jog around the park"
        },
        {
            checked: false,
            name: "Jog around the park"
        },
        {
            checked: false,
            name: "Jog around the park in Maputo next BCI brach"
        },
        {
            checked: false,
            name: "Jog around the park"
        }
    ]
    return (
        <div>
            <div>
                <Head title="Home" />
                <header className="bg-center bg-cover bg-no-repeat px-[5%] pt-6 header">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-slate-200 text-2xl uppercase header__title">
                            Todo
                        </h1>
                        <button aria-label="theme toggle" className="bg-center bg-no-repeat header__toggle-button"></button>
                    </div>
                </header>
                <main className="main px-[5%]">
                    <div className="container">
                        <form className="bg-blue-700 flex items-center px-4">
                            <label className='check-container'>
                                <input 
                                    className=''
                                    type="checkbox" 

                                />
                                <span className="checkmark"></span>
                            </label>
                            <input 
                                className="bg-transparent grow text-base px-4 py-3 outline-none text-slate-200" 
                                placeholder='Create a new todo...'
                            />
                        </form>
                        <ul className='mt-12'>
                            { 
                                list.map(item => <TodosItem key={useId()} { ...item} />)
                            }
                        </ul>
                    </div>
                </main>
            </div>

            <style jsx>{`
                .header {
                    background-image: url(/images/bg-mobile-dark.jpg);
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
                    background-color: #0d0e1a;
                    min-height: 61vh;
                }

                .container {
                    transform: translateY(-160px);
                }
            `}</style>
        </div>
    );
};

export default Container;
