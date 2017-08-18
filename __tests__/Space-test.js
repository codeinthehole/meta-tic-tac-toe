import React from 'react';
import { shallow } from 'enzyme';

import Space from '../src/Space';

test('<Space ... />', () => {
    const component = shallow(<Space mark="X" />);

    expect(component.html()).toContain('<div class="space">X</div>')
});
