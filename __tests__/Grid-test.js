import React from 'react';
import { shallow } from 'enzyme';

import Grid from '../src/Grid';

test('<Grid />', () => {
    const component = shallow(<Grid />);

    // Not a good assertion - better to check that the right number of Space components
    // have been called.
    expect(component.html()).toContain('grid')
});
