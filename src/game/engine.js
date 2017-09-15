export function handleCellClick(state, gridIndex, cellIndex) {
    if (!isMoveValid(state, gridIndex, cellIndex)) {
        return state
    }

    // Update grids array with the valid mark
    const marks = state.grids[gridIndex]
    let newGrids = state.grids.slice()
    let newMarks = marks.slice()
    newMarks[cellIndex] = state.nextMark
    newGrids[gridIndex] = newMarks

    // Check if the grid just moved in is now complete - if so, update the
    // completeGrids array
    const completeGrids = state.completeGrids.slice()
    if (App.utils.isGridOutcomeDecided(newMarks)) {
        completeGrids.push(gridIndex)
    }

    // Determine which grids the next player can move in
    let availableGrids
    if (completeGrids.indexOf(cellIndex) === -1) {
        // If the cell-linked grid is not complete, we can only move there
        availableGrids = [cellIndex]
    } else {
        // Otherwise, we can move in all grids that aren't complete
        const allGrids = [...Array(props.size * props.size).keys()]
        availableGrids = allGrids.filter(value => completeGrids.indexOf(value) === -1) 
    }

    // Update next player
    let nextMark = state.nextMark == "X" ? "O" : "X"

    return {
        grids: newGrids,
        completeGrids: completeGrids,
        availableGrids: availableGrids,
        nextMark: nextMark
    }
}

export const App = {
    utils: {
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
}

function isMoveValid(state, gridIndex, cellIndex) {
    // Check if game has been won already
    if (App.utils.calculateWinner(state.grids)) {
        return false
    } 
    // Check if grid is allowed to be moved in
    if (state.completeGrids.indexOf(gridIndex) !== -1) {
        return false
    }
    if (state.availableGrids.indexOf(gridIndex) === -1) {
        return false
    } 
    // Check if cell is free
    const marks = state.grids[gridIndex]
    if (marks[cellIndex]) {
        return false
    }
    return true
}
