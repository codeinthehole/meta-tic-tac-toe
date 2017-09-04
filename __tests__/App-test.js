import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../src/App';

describe("App.utils.calculateWinner", () => {

    test('empty board has no winner', () => {
        const marks = Array(9).fill(null)
        expect(App.utils.calculateWinner(marks)).toEqual(null)
    });

    test('top line winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[1] = "X"
        marks[2] = "X"
        expect(App.utils.calculateWinner(marks)).toEqual("X")
    });

    test('second line winner', () => {
        let marks = Array(9).fill(null)
        marks[3] = "X"
        marks[4] = "X"
        marks[5] = "X"
        expect(App.utils.calculateWinner(marks)).toEqual("X")
    });

    test('first column winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[3] = "X"
        marks[6] = "X"
        expect(App.utils.calculateWinner(marks)).toEqual("X")
    });

    test('diagonal winner', () => {
        let marks = Array(9).fill(null)
        marks[0] = "X"
        marks[4] = "X"
        marks[8] = "X"
        expect(App.utils.calculateWinner(marks)).toEqual("X")
    });

})
