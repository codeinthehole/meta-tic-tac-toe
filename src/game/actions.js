export const CLICK_CELL = 'CLICK_CELL'

export function clickCell(gridIndex, cellIndex) {
    return {
        type: CLICK_CELL,
        gridIndex: gridIndex, 
        cellIndex: cellIndex,
    }
}
