import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Store from './store/Store'

const Index = () => (
    <Store>
        <App />
    </Store>
);

render(<Index />, document.getElementById('root'));