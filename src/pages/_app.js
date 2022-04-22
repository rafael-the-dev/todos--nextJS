import Head from "next/head"

import "src/styles/tailwind.css"

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Component { ...pageProps } />
        </>
    );
};

export default App;