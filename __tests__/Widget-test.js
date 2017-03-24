import React from 'react';
import { shallow } from 'enzyme';

import Widget from '../src/Widget';


test('<Widget name="dave" />', () => {
    const wrapper = shallow(<Widget name="dave" />);

    expect(wrapper.html()).toEqual("<div>DAVE</div>")

});
