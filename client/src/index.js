import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CarState from './context/cars/carState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './index.css';


ReactDOM.render(
    <AuthState>
        <CarState>
            <AlertState>
                <App />
            </AlertState>
        </CarState>
    </AuthState>
    , document.getElementById('root')
);

