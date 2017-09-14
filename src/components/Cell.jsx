// A "Cell" is a single element within a (normally 3x3) "Grid". It simply
// renders a "mark" (normally a 0 or X) and calls a passed callback when clicked.
import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {

    render() {
        return <div className="space" onClick={() => this.props.onClick()}>{this.props.mark}</div>
    }

}

Cell.propTypes = {
    onClick: PropTypes.func.isRequired,
    // Should be either null, "X" or "0"
    mark: PropTypes.string,
}

Cell.defaultProps = {
    mark: null,
}

export default Cell
