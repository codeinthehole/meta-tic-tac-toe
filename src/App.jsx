import React from 'react';

import Grid from "./Grid"

const debug = console.log

class App extends React.Component {

    constructor(props) {
        super(props);

        // Manage all state at this level
        this.state = {
            marks: Array(3 * 3).fill(null),
            nextMark: "X"
        };
    }

    handleCellClick(gridIndex) {
        // Check click is valid
        if (this.state.marks[gridIndex] !== null) {
            debug("Invalid move: that cell is not available")
            return
        }
        // Update marks array
        let newMarks = this.state.marks.slice()
        newMarks[gridIndex] = this.state.nextMark
        // Update next player
        let nextMark = this.state.nextMark == "X" ? "O" : "X"
        debug(`Setting index ${gridIndex} to ${this.state.nextMark} and nextMark to ${nextMark}`)
        this.setState({marks: newMarks, nextMark: nextMark})
    }

    render() {
        return (
            <div id="app">
                <h1>Metagrid</h1>
                <p>Next player: {this.state.nextMark}</p>
                <Grid marks={this.state.marks} onCellClick={this.handleCellClick.bind(this)} /> 
            </div>
        )
    }
}

export default App
