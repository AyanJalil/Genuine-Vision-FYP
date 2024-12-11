import react from 'react';
import reactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '../context/AuthProvider';


const el = document.getElementById('root');

const root = reactDOM.createRoot(el);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </BrowserRouter>
)