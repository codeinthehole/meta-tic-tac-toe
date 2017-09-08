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
                {this.renderGameSummary()}
                <MultiGrid 
                    grids={this.state.grids} 
                    onCellClick={this.handleCellClick.bind(this)} 
                    nextGridIndex={this.state.nextGridIndex} /> 
            </div>
        )
    }

    renderGameSummary() {
        const winner = App.utils.calculateWinner(this.state.grids)
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
    _lines: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    // Test if a grid's outcome is decided
    isGridOutcomeDecided: function(marks) {
        // A grid outcome is decided if the grid either won or drawn
        return (
            App.utils.isGridWon(marks) ||
            App.utils.isGridDrawn(marks)
        )
    },
    // Test if a grid is drawn
    isGridDrawn: function(marks) {
        // A grid is drawn if all its lines are drawn
        const lines = App.utils._lines
        for (let i = 0; i < lines.length; i++) {
            const line = [
                marks[lines[i][0]],
                marks[lines[i][1]],
                marks[lines[i][2]]
            ]
            if (!App.utils.isLineDrawn(line)) {
                return false
            }
        }
        return true;
    },
    isLineDrawn: function(marks) {
        // A line is drawn if there is at least one O and X
        let foundX = false, foundO = false;
        for (let i = 0; i < marks.length; i++) {
            if (marks[i] == "X") {
                foundX = true
            } else if (marks[i] == "O") {
                foundO = true
            }
        }
        return foundX && foundO
    },
    isGridWon: function(marks) {
        return App.utils.calculateGridWinner(marks) !== null
    },
    calculateWinner: function(grids) {
        // Convert meta-grid into normal grid
        const wonGrids = grids.map(App.utils.calculateGridWinner)
        return App.utils.calculateGridWinner(wonGrids)
    },
    calculateGridWinner: function(marks) {
        const lines = App.utils._lines
        for (let i = 0; i < lines.length; i++) {
            const line = [
                marks[lines[i][0]],
                marks[lines[i][1]],
                marks[lines[i][2]]
            ]
            if (App.utils.isLineWon(line)) {
                return line[0]
            }

            const [a, b, c] = lines[i];
            if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
                return marks[a];
            }
        }
        return null;
    },
    isLineWon: function(marks) {
        return (marks[0] && marks[0] === marks[1] && marks[0] === marks[2]) 
    }
}

export default App
