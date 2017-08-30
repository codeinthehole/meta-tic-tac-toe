// A "Cell" is a single element within a (normally 3x3) "Grid". It simply
// renders a "mark" (normally a 0 or X)
import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {

    render() {
        let clickHandler;
        if (this.props.mark === null) {
            clickHandler = () => { this.props.onValidClick() }
        } else {
            clickHandler = () => { this.props.onInvalidClick() }
        }
        return <div className="space" onClick={clickHandler}>{this.props.mark}</div>
    }

}

Cell.propTypes = {
    // Should be either null, "X" or "0"
    mark: PropTypes.string,
    onValidClick: PropTypes.func.isRequired,
    onInvalidClick: PropTypes.func,
}

Cell.defaultProps = {
    mark: null,
    onInvalidClick: function() {
        console.log("Invalid click")
    }
}

export default Cell
