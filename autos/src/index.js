import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client' en React 18
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);


