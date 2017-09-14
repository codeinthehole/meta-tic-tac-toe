import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ConnectedApp from './App';
import { reduce } from './reducers'

// Configure redux store
let store = createStore(
    reduce,
    // For Chrome redux extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedApp />
        </Provider>, 
        document.getElementById('mount')
    );
});
