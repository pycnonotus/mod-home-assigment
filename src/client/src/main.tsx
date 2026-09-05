import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./stores/groceriesStore.ts";
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import {prefixer} from 'stylis';

const theme = createTheme({direction: 'rtl'});
const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </CacheProvider>
    </StrictMode>,
)
