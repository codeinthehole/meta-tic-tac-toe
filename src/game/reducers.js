import { CLICK_CELL, RESET_GAME } from './actions'
import { Rules } from './engine' 

export const initialState = {
    // The mark of the next player to play
    nextMark: "X",
    // An array of arrays - each value is either "X", "O" or null. We start will all
    // nulls, as in no player has played yet.
    grids: Array(3 * 3).fill(
        Array(3 * 3).fill(null)
    ),
    // An array where each element is the index of a grid where the
    // outcome is decided.
    completeGrids: [],
    // An array where each element is the index of a grid where the
    // next player can move. Starts as all grids
    availableGrids: [...Array(3 * 3).keys()],
    // Array of events - just used to show more information about what has happened
    events: [],
    // The winning player
    winner: null,
}

export function reduce(state=initialState, action) {
    switch (action.type) {
        case CLICK_CELL:
            const mutations = handleCellClick(state, action.gridIndex, action.cellIndex)
            return Object.assign({}, state, mutations)

        case RESET_GAME:
            return initialState

        default:
            return state
    }
}

// Return the state mutations given a starting state and a cell click
function handleCellClick(state, gridIndex, cellIndex) {
    let newEvents = state.events.slice()

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
    if (Rules.isGridOutcomeDecided(newMarks)) {
        completeGrids.push(gridIndex)
        newEvents.push({
            description: `Grid ${gridIndex} is now complete`
        })
    }

    // Determine which grids the next player can move in
    let availableGrids
    if (completeGrids.indexOf(cellIndex) === -1) {
        // If the cell-linked grid is not complete, we can only move there
        availableGrids = [cellIndex]
    } else {
        // Otherwise, we can move in all grids that aren't complete
        const allGrids = [...Array(3 * 3).keys()]
        availableGrids = allGrids.filter(value => completeGrids.indexOf(value) === -1) 
    }

    // See if the game is won now
    const winner = Rules.calculateWinner(newGrids)
    if (winner) {
        availableGrids = []
    }

    // Update next player
    let nextMark = state.nextMark == "X" ? "O" : "X"

    return {
        nextMark: nextMark,
        grids: newGrids,
        completeGrids: completeGrids,
        availableGrids: availableGrids,
        events: newEvents,
        winner: winner,
    }
}

function isMoveValid(state, gridIndex, cellIndex) {
    // Check if game has been won already
    if (Rules.calculateWinner(state.grids)) {
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
