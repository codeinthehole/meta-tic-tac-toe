export const CLICK_CELL = 'CLICK_CELL'
export const RESET_GAME = 'RESET_GAME'

export function clickCell(gridIndex, cellIndex) {
    return {
        type: CLICK_CELL,
        gridIndex: gridIndex, 
        cellIndex: cellIndex,
    }
}

export function resetGame() {
    return {
        type: RESET_GAME,
    }
}
