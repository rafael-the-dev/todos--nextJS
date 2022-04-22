import Head from 'next/head'

const Container = () => {
    return (
        <div>
            <div>
                <Head title="Home" />
                <h1 className="font-bold text-2xl">Hello world</h1>

            </div>

            <style jsx>{``}</style>
        </div>
    );
};

export default Container;
