import React from 'react';

import Grid from "./Grid"

class App extends React.Component {

    render() {
        let marks = [
            null, null, null,
            null, "X", null,
            null, null, "0",
        ]
        return (
            <div id="app">
                <h1>Metagrid</h1>
                <Grid marks={marks} /> 
            </div>
        )
    }
}

export default App
