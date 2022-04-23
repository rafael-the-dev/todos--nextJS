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
            <div className="bg-no-repeat app">
                <Head title="Home" />
                <header className="bg-center bg-cover bg-no-repeat px-[5%] pt-6 header sm:pt-12">
                    <div className="flex justify-between items-center sm:mx-auto sm:max-w-[450px] md:max-w-[550px]">
                        <h1 className="font-bold text-slate-200 text-2xl uppercase header__title">
                            Todo
                        </h1>
                        <button aria-label="theme toggle" className="bg-center bg-no-repeat header__toggle-button"></button>
                    </div>
                </header>
                <main className="main px-[5%]">
                    <div className="container sm:mx-auto sm:max-w-[450px] md:max-w-[550px]">
                        <form className="bg-blue-700 flex items-center px-4 py-1">
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
                        <div>
                            <ul className='mt-12'>
                                { 
                                    list.map(item => <TodosItem key={useId()} { ...item} />)
                                }
                                <li className="bg-blue-700 border-b border-solid border-slate-700 
                                    flex items-center justify-between px-4 py-4 last:border-0">
                                    <span className="text-slate-300 opacity-40">4 items left</span>
                                    <button className="capitalize text-slate-300 opacity-40 hover:text-white hover:opacity-100">
                                        Clear completed
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-blue-700 flex items-center justify-center mt-8 text-slate-500 py-4">
                            <button className="mr-3 hover:text-white">All</button>
                            <button className="mr-3 hover:text-white">Active</button>
                            <button className="hover:text-white">Completed</button>
                        </div>
                        <div className="mt-12">
                            <p className="text-center text-slate-500">Drag and drop to reorder list</p>
                        </div>
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

                @media screen and (min-width: 600px) {
                    .header {
                        background-image: none;
                        height: auto;
                    }

                    .app {
                        background-image: url(/images/bg-desktop-dark.jpg);
                        background-size: 100% 290px;
                        background-color: #0d0e1a;
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
