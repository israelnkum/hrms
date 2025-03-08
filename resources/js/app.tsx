/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import 'react-app-polyfill/stable'
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor, Store} from './utils/Store'
import ProtectedRoutes from "./commons/routes/ProtectedRoutes";
import {BrowserRouter} from "react-router-dom";
import {AppContextProvider} from "./context/app-context";
import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = createRoot(document.getElementById('root'));

if (root) {
    root.render(
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppContextProvider>
                        <ProtectedRoutes/>
                    </AppContextProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
