import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../src/App';

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

    test('5 won grids means a winner', () => {
        let grids = buildMultigrid()
        const grid = buildWonGrid("X")
        grids[0] = grid
        grids[1] = grid
        grids[2] = grid
        grids[3] = grid
        grids[4] = grid

        expect(App.utils.calculateWinner(grids)).toEqual("X")
    })

})
