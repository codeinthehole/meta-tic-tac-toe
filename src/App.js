import React from 'react';

function Person(props) {
    return (
        <div>{props.name}</div>
    )
}

const Man = (props) => <h4>{props.name}</h4>


class App extends React.Component {

    render() {
        return (
            <div>
                <h2>Stuff</h2>
                <Person name="David" />
                <Person name="hell" />
                <Man name="ssss" />
            </div>
        )
    }
}

export default App
