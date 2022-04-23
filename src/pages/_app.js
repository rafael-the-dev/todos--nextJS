import Head from "next/head"

import "src/styles/tailwind.css"
import "src/styles/checkmark.css"
import "src/styles/global.css"
import { ThemeContextProvider } from "src/context/ThemeContext";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeContextProvider>
                <Component { ...pageProps } />
            </ThemeContextProvider>
        </>
    );
};

export default App;