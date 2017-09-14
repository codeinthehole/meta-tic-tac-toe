import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { App } from '../src/reducers';

describe("App.utils.calculateGridWinner", () => {

    test('empty board has no winner', () => {
        const marks = Array(9).fill(null)
        expect(App.utils.calculateGridWinner(marks)).toEqual(null)
    });

    test('top line winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[1] = "X"
        marks[2] = "X"
        expect(App.utils.calculateGridWinner(marks)).toEqual("X")
    });

    test('second line winner', () => {
        let marks = Array(9).fill(null)
        marks[3] = "X"
        marks[4] = "X"
        marks[5] = "X"
        expect(App.utils.calculateGridWinner(marks)).toEqual("X")
    });

    test('first column winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[3] = "X"
        marks[6] = "X"
        expect(App.utils.calculateGridWinner(marks)).toEqual("X")
    });

    test('diagonal winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[4] = "X"
        marks[8] = "X"
        expect(App.utils.calculateGridWinner(marks)).toEqual("X")
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

describe("App.utils.calculateWinner", () => {
    
    test('empty grids have no winner', () => {
        let grids = buildMultigrid()

        expect(App.utils.calculateWinner(grids)).toBeNull()
    })

    test('first row winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[1] = grid
        grids[2] = grid

        expect(App.utils.calculateWinner(grids)).toEqual("X")
    })

    test('first column winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[3] = grid
        grids[6] = grid

        expect(App.utils.calculateWinner(grids)).toEqual("X")
    })

    test('diagonal winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[4] = grid
        grids[8] = grid

        expect(App.utils.calculateWinner(grids)).toEqual("X")
    })

})

describe("App.utils.isGridOutcomeDecided", () => {
    
    test("empty grid is not decided", () => {
        const grid = buildGrid()

        expect(App.utils.isGridOutcomeDecided(grid)).toBeFalsy()
    })

    test("partial grid is not decided", () => {
        const grid = [
            'O', 'O', 'X',
            null, 'X', 'O',
            'O', 'X', 'X'
        ]

        expect(App.utils.isGridOutcomeDecided(grid)).toBeFalsy()
    })

    test("won grid is decided", () => {
        const grid = buildWonGrid()

        expect(App.utils.isGridOutcomeDecided(grid)).toBeTruthy()
    })

    test("drawn grid is decided", () => {
        const grid = [
            'O', 'O', 'X',
            'X', 'X', 'O',
            'O', 'X', 'X'
        ]

        expect(App.utils.isGridOutcomeDecided(grid)).toBeTruthy()
    })
})
