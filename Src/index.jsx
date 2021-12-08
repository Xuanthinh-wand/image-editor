import React from 'react'
import ReactDOM from 'react-dom'

import './start';
import './lib/extensions';
import App from './app';
import { RmeProvider } from "./reducers";

ReactDOM.render(
    <RmeProvider>
        <App />
    </RmeProvider>,
    document.getElementById('rmeApp')
);
