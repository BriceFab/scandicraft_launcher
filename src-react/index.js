import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/app';
import routes from './routes/routes.json';

ReactDOM.render(
    <React.StrictMode>
        <Router basename={routes.LOGIN}>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);