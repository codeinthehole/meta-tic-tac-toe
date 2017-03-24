import React from 'react';

const Person = ({name}) => <h4>{name}</h4>

class App extends React.Component {

    render() {
        return (
            <div>
                <h2>Stuff</h2>
                <Person name="David" />
                <Person name="hell" />
                <Person name="ssss" />
            </div>
        )
    }
}

export default App
