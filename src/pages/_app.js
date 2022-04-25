import Head from "next/head"

import "src/styles/tailwind.css"
import "src/styles/checkmark.css"
import "src/styles/global.css"

import { ThemeContextProvider } from "src/context/ThemeContext";
import { AppContextProvider } from "src/context/AppContext";

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeContextProvider>
                <AppContextProvider>
                    <Component { ...pageProps } />
                </AppContextProvider>
            </ThemeContextProvider>
        </>
    );
};

export default App;