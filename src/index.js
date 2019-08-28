import React from 'react';
import { render } from 'react-dom';

import App from './App';
import Store from './utils/Store'

const Index = () => (
    <Store>
        <App />
    </Store>
);

render(<Index />, document.getElementById('root'));