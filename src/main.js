import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppContainer from './containers/AppContainer';
import { reduce } from './game/reducers'

// Configure Redux store
let store = createStore(
    // Core game engine
    reduce,
    // For Chrome Redux extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>, 
        document.getElementById('mount')
    );
});
