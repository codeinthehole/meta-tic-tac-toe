import React from 'react';
import { shallow } from 'enzyme';

import Cell from '../../src/components/Cell';

test('<Cell ... />', () => {
    const component = shallow(<Cell mark="X" onClick={() => {}} />);

    expect(component.html()).toContain('<div class="space">X</div>')
});
