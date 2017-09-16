import { Rules } from '../../src/game/engine';

describe("Rules.calculateGridWinner", () => {

    test('empty board has no winner', () => {
        const marks = Array(9).fill(null)
        expect(Rules.calculateGridWinner(marks)).toEqual(null)
    });

    test('top line winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[1] = "X"
        marks[2] = "X"
        expect(Rules.calculateGridWinner(marks)).toEqual("X")
    });

    test('second line winner', () => {
        let marks = Array(9).fill(null)
        marks[3] = "X"
        marks[4] = "X"
        marks[5] = "X"
        expect(Rules.calculateGridWinner(marks)).toEqual("X")
    });

    test('first column winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[3] = "X"
        marks[6] = "X"
        expect(Rules.calculateGridWinner(marks)).toEqual("X")
    });

    test('diagonal winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[4] = "X"
        marks[8] = "X"
        expect(Rules.calculateGridWinner(marks)).toEqual("X")
    });

})

// Factories
function buildMultigrid() {
    return Array(9).fill(buildGrid())
}

function buildGrid() {
    return Array(9).fill(null)
}

function buildWonGrid(mark="X") {
    let grid = buildGrid()
    grid[0] = mark
    grid[1] = mark
    grid[2] = mark
    return grid
}

describe("Rules.calculateWinner", () => {
    
    test('empty grids have no winner', () => {
        let grids = buildMultigrid()

        expect(Rules.calculateWinner(grids)).toBeNull()
    })

    test('first row winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[1] = grid
        grids[2] = grid

        expect(Rules.calculateWinner(grids)).toEqual("X")
    })

    test('first column winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[3] = grid
        grids[6] = grid

        expect(Rules.calculateWinner(grids)).toEqual("X")
    })

    test('diagonal winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[4] = grid
        grids[8] = grid

        expect(Rules.calculateWinner(grids)).toEqual("X")
    })

})

describe("Rules.isGridOutcomeDecided", () => {
    
    test("empty grid is not decided", () => {
        const grid = buildGrid()

        expect(Rules.isGridOutcomeDecided(grid)).toBeFalsy()
    })

    test("partial grid is not decided", () => {
        const grid = [
            'O', 'O', 'X',
            null, 'X', 'O',
            'O', 'X', 'X'
        ]

        expect(Rules.isGridOutcomeDecided(grid)).toBeFalsy()
    })

    test("won grid is decided", () => {
        const grid = buildWonGrid()

        expect(Rules.isGridOutcomeDecided(grid)).toBeTruthy()
    })

    test("drawn grid is decided", () => {
        const grid = [
            'O', 'O', 'X',
            'X', 'X', 'O',
            'O', 'X', 'X'
        ]

        expect(Rules.isGridOutcomeDecided(grid)).toBeTruthy()
    })
})
