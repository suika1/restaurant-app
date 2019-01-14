import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureStore from './store/store';

import './index.css';

const store = configureStore();

const theme = createMuiTheme({
    palette: {
        primary: { main: '#9c28b1', light: '#e1bee8' },
        secondary: { main: '#7920a2' },
    },
    typography: { useNextVariants: true },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </MuiThemeProvider>
, document.getElementById('root'));