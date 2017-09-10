import React from 'react';
import PropTypes from 'prop-types';

import MultiGrid from "./MultiGrid"

const debug = console.log

class App extends React.Component {

    constructor(props) {
        super(props);

        // Manage all state at this level
        this.state = {
            // An array of arrays - each value is either "X", "O" or null.
            grids: Array(this.props.size * this.props.size).fill(
                Array(this.props.size * this.props.size).fill(null)),
            // An array where each element is the index of a grid where the
            // outcome is decided.
            completeGrids: [],
            // The mark of the next player
            nextMark: "X",
            // The grid that the next player must play in.
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
        // TODO this is duplication of the logic in the multigrid
        if (this.state.completeGrids.indexOf(gridIndex) !== -1) {
            debug("Invalid move: grid already won")
            return
        }
        if (this.state.nextGridIndex !== null && gridIndex !== this.state.nextGridIndex) {
            debug("Invalid move: moving in that grid is not permitted")
            return
        } 
        // Check if cell is free
        const marks = this.state.grids[gridIndex]
        if (marks[cellIndex]) {
            debug("Invalid move: that cell is not available")
            return
        }

        // Move is valid!

        // Update grids array
        let newGrids = this.state.grids.slice()
        let newMarks = marks.slice()
        newMarks[cellIndex] = this.state.nextMark
        newGrids[gridIndex] = newMarks

        // Check if the grid just moved in is now complete
        const completeGrids = this.state.completeGrids.slice()
        if (App.utils.isGridOutcomeDecided(newMarks)) {
            debug(`Grid ${gridIndex} is now complete`)
            completeGrids.push(gridIndex)
        }

        // Update next player
        let nextMark = this.state.nextMark == "X" ? "O" : "X"
        debug(`Setting cell ${cellIndex} of grid ${gridIndex} to ${this.state.nextMark} and nextMark to ${nextMark}`)

        // Update nextGridIndex - If the next grid's outcome is already
        // decided, then any grid is valid
        let nextGridIndex = cellIndex
        if (completeGrids.includes(nextGridIndex)) {
            nextGridIndex = null
        }

        this.setState({
            grids: newGrids, 
            completeGrids: completeGrids,
            nextMark: nextMark, 
            nextGridIndex: nextGridIndex})
    }

    render() {
        return (
            <div id="app">
                <h1>Metagrid</h1>
                {this.renderGameSummary()}
                <MultiGrid 
                    grids={this.state.grids} 
                    completeGrids={this.state.completeGrids}
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
