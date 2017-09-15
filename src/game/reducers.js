import { CLICK_CELL } from './actions'
import { handleCellClick } from './engine' 

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
            const mutations = handleCellClick(state, action.gridIndex, action.cellIndex)
            return Object.assign({}, state, mutations)

        default:
            return state
    }
}
