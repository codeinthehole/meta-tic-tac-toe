import React from 'react';
import PropTypes from 'prop-types';

import MultiGrid from "./MultiGrid"

const debug = console.log

class App extends React.Component {

    constructor(props) {
        super(props);

        // Manage all state at this level
        this.state = {
            // Model as an array of arrays
            grids: Array(this.props.size * this.props.size).fill(
                Array(this.props.size * this.props.size).fill(null)),
            nextMark: "X",
            nextGridIndex: null
        };
    }

    handleCellClick(gridIndex, cellIndex) {
        // Check if game has been won already
        if (App.utils.calculateWinner(this.state.grids)) {
            debug("Invalid move: game already won")
            return
        } 
        // Check if grid is allowed to be moved in
        if (this.state.nextGridIndex !== null && gridIndex !== this.state.nextGridIndex) {
            debug("Invalid move: that grid is not available")
            return
        } 
        // Check if cell is free
        const marks = this.state.grids[gridIndex]
        if (marks[cellIndex]) {
            debug("Invalid move: that cell is not available")
            return
        }

        // Update grids array
        let newGrids = this.state.grids.slice()
        let newMarks = marks.slice()
        newMarks[cellIndex] = this.state.nextMark
        newGrids[gridIndex] = newMarks

        // Update next player
        let nextMark = this.state.nextMark == "X" ? "O" : "X"
        debug(`Setting cell ${cellIndex} of grid ${gridIndex} to ${this.state.nextMark} and nextMark to ${nextMark}`)

        // Update nextGridIndex
        // TODO Check that the next grid is valid
        let nextGridIndex = cellIndex

        this.setState({grids: newGrids, nextMark: nextMark, nextGridIndex: nextGridIndex})
    }

    render() {
        return (
            <div id="app">
                <h1>Metagrid</h1>
                <MultiGrid grids={this.state.grids} onCellClick={this.handleCellClick.bind(this)} /> 
            </div>
        )
    }

    renderStatus() {
        const winner = App.utils.calculateWinner(this.state.marks)
        if (winner) {
            return <p>Winner is {winner}</p>
        } else {
            return <p>Next player: {this.state.nextMark}</p>
        }
    }
}

App.propTypes = {
    size: PropTypes.number,
}

App.defaultProps = {
    size: 3
}

App.utils = {
    calculateWinner: function(grids) {
        // Someone has won when either...
        //
        // (a) they have won 5 or more grids
        const wonGrids = grids.map(App.utils.calculateGridWinner)
        let counts = {}
        for (var i = 0; i < wonGrids.length; i++) {
            if (wonGrids[i] !== null) {
                counts[wonGrids[i]] = 1 + (counts[wonGrids[i]] || 0)
            }
        }
        if (counts["X"] >= 5 ) {
            return "X"
        }
        if (counts["O"] >= 5 ) {
            return "O"
        }
        return null
    },
    calculateGridWinner: function(marks) {
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
