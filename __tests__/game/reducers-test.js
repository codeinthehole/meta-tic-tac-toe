import { initialState, reduce } from '../../src/game/reducers';
import { clickCell } from '../../src/game/actions';

describe("reducer", () => {

    test('should return initial state by default', () => {
        expect(reduce(undefined, {})).toEqual(initialState)
    });

    test('should update state correctly after click in empty grid', () => {
        const state = reduce(initialState, clickCell(0, 0))

        expect(state.nextMark).toEqual("O")
        expect(state.grids[0][0]).toEqual("X")
        expect(state.availableGrids).toEqual([0])
    });

    test('should update state correctly after grid-winning click', () => {
        let state = initialState
        state = reduce(state, clickCell(4, 4)) // X
        state = reduce(state, clickCell(4, 1)) // O
        state = reduce(state, clickCell(1, 4)) // X
        state = reduce(state, clickCell(4, 0)) // O
        state = reduce(state, clickCell(0, 4)) // X
        state = reduce(state, clickCell(4, 2)) // O
        // O has won grid 4 now

        expect(state.nextMark).toEqual("X")
        expect(state.completeGrids).toEqual([4])
    });

})
