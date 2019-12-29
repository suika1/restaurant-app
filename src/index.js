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
        <Router basename="/restaurant-app/">
            <Provider store={store}>
//                 <App/>
                <h3>Test jenkins</h3>
            </Provider>
        </Router>
    </MuiThemeProvider>
, document.getElementById('root'));
