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

App.utils = {
    calculateWinner: function(marks) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
                return marks[a];
            }
        }
        return null;
    }
}

export default App
