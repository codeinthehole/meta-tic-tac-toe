import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Grid from '../src/Grid';

test('<Grid /> renders correctly', () => {
    const component = shallow(<Grid />);

    // Not a good assertion - better to check that the right number of Space components
    // have been called.
    expect(component.html()).toContain('grid')
});

test('passing invalid marks to <Grid /> raises a warning', () => {
    // Replace console.error with a spy
    const stub = sinon.stub(console, 'error')

    // Should be 9 cells, not 3
    const marks = [null, null, null]
    const component = shallow(<Grid marks={marks} size={3} />);

    expect(stub.calledOnce)
    console.error.restore()
});

test('Grid.utils.chunkArray correctly splits arrays', () => {
    let result = Grid.utils.chunkArray([1,2,3,4,5,6], 3)
    expect(result).toEqual([[1,2,3], [4,5,6]])

    result = Grid.utils.chunkArray([1,2,3,4], 2)
    expect(result).toEqual([[1,2], [3,4]])
});
