import Head from 'next/head'

const Container = () => {
    return (
        <div>
            <div>
                <Head title="Home" />
                <header className="bg-center bg-cover bg-no-repeat header">
                    <div className="flex justify-between items-center">
                        <h1 className="text-slate-200 uppercase">
                            Todo
                        </h1>
                        <button aria-label="theme toggle"></button>
                    </div>
                </header>

            </div>

            <style jsx>{`
                .header {
                    background-image: url(/images/bg-mobile-dark.jpg);
                    height: 250px;
                }
            `}</style>
        </div>
    );
};

export default Container;
