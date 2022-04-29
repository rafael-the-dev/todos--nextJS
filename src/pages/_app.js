import Head from "next/head"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <ThemeContextProvider>
                <AppContextProvider>
                    <DndProvider backend={HTML5Backend}>
                        <Component { ...pageProps } />
                    </DndProvider> 
                </AppContextProvider>
            </ThemeContextProvider>
        </>
    );
};

export default App;