import React from 'react';
import PropTypes from 'prop-types';

import Space from './Space'

class Grid extends React.Component {

    render() {
        // Split array of marks up into equal size

        let spaces = this.props.marks.map(function(mark, index) {
            return <Space key={index} mark={mark} />
        })
        return (
            <div className="grid">{spaces}</div>
        )
    }
}

Grid.propTypes = {
    size: PropTypes.number,
    marks: function(props, propName, componentName) {
        // Check the right number of marks are passed in
        let size = props.size;
        let expectedNumMarks = size * size;
        let actualNumMarks = props[propName].length;1
        if (actualNumMarks !== expectedNumMarks) {
            let msg = `${actualNumMarks} marks passed in but ${expectedNumMarks} are required`
            throw new Error(msg)
        }
    },
    isAvailableForMove: PropTypes.bool
}

Grid.defaultProps = {
    marks: [
        null, null, null,
        null, null, null,
        null, null, null,
    ],
    isAvailableForMove: true,
    size: 3,
}

export default Grid
