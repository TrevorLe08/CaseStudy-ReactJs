import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { MyProvider } from './context/MyContext.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import ToastProvider from './context/ToastContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ToastProvider>
        <MyProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </MyProvider>
    </ToastProvider>
);

