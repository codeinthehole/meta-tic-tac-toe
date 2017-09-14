import { CLICK_CELL } from './actions'

const debug = console.log

const initialState = {
    // The mark of the next player to play
    nextMark: "X",
    // An array of arrays - each value is either "X", "O" or null. We start will all
    // nulls, as in no player has played yet.
    grids: Array(3 * 3).fill(
        Array(3 * 3).fill(null)),
    // An array where each element is the index of a grid where the
    // outcome is decided.
    completeGrids: [],
    // An array where each element is the index of a grid where the
    // next player can move. Starts as all grids
    availableGrids: [...Array(3 * 3).keys()],
}

export function reduce(state=initialState, action) {
    switch (action.type) {
        case CLICK_CELL:
            return handleCellClick(state, action.gridIndex, action.cellIndex)
        default:
            return state
    }
}

function handleCellClick(state, gridIndex, cellIndex) {
    console.log("Click cell reducer", gridIndex, cellIndex)

    if (!isMoveValid(state, gridIndex, cellIndex)) {
        return state
    }

    // Update grids array with mark
    const marks = state.grids[gridIndex]
    let newGrids = state.grids.slice()
    let newMarks = marks.slice()
    newMarks[cellIndex] = state.nextMark
    newGrids[gridIndex] = newMarks

    // Check if the grid just moved in is now complete
    const completeGrids = state.completeGrids.slice()
    if (App.utils.isGridOutcomeDecided(newMarks)) {
        debug(`Grid ${gridIndex} is now complete`)
        completeGrids.push(gridIndex)
    }

    // Update nextGridIndex - If the next grid's outcome is already
    // decided, then any grid is valid
    let nextGridIndex = cellIndex
    if (completeGrids.includes(nextGridIndex)) {
        nextGridIndex = null
    }

    // Determine which grids the next player can move in
    let availableGrids
    if (completeGrids.indexOf(cellIndex) === -1) {
        // If the cell-linked grid is not complete, we can only move there
        availableGrids = [cellIndex]
    } else {
        const allGrids = [...Array(props.size * props.size).keys()]
        availableGrids = allGrids.filter(value => completeGrids.indexOf(value) === -1) 
    }

    // Update next player
    let nextMark = state.nextMark == "X" ? "O" : "X"
    debug(`Setting cell ${cellIndex} of grid ${gridIndex} to ${state.nextMark} and nextMark to ${nextMark}`)

    return Object.assign({}, state, {
        grids: newGrids,
        completeGrids: completeGrids,
        availableGrids: availableGrids,
        nextMark: nextMark
    })
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
        debug("Invalid move: game already won")
        return false
    } 
    // Check if grid is allowed to be moved in
    // TODO this is duplication of the logic in the multigrid
    if (state.completeGrids.indexOf(gridIndex) !== -1) {
        debug(`Invalid move: the outcome for grid ${gridIndex} is already determined`)
        return false
    }
    if (state.availableGrids.indexOf(gridIndex) === -1) {
        debug(`Invalid move: moving in grid ${gridIndex} is not permitted`)
        return false
    } 
    // Check if cell is free
    const marks = state.grids[gridIndex]
    if (marks[cellIndex]) {
        debug("Invalid move: that cell is not available")
        return false
    }
    return true
}
