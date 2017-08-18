import React from 'react';
import PropTypes from 'prop-types';

import Space from './Space'

class Grid extends React.Component {

    render() {
        let spaces = this.props.marks.map(function(mark, index) {
            return <Space key={index} mark={mark} />
        })
        return (
            <div className="grid">{spaces}</div>
        )
    }
}

Grid.propTypes = {
    marks: PropTypes.arrayOf(PropTypes.string),
    isAvailableForMove: PropTypes.bool,
}

Grid.defaultProps = {
    marks: [
        null, null, null,
        null, null, null,
        null, null, null,
    ],
    isAvailableForMove: true,
}

export default Grid
