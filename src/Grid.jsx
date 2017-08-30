import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell'


class Grid extends React.Component {

    handleCellClick(index) {
        console.log("Cell click on index " + index)
    }

    render() {
        const chunkedMarks = Grid.utils.chunkArray(this.props.marks, this.props.size)
        let cells;
        let rows = chunkedMarks.map((marks, rowIndex) => {
            cells = marks.map((mark, markIndex) => {
                const gridIndex = rowIndex * this.props.size + markIndex
                return <Cell 
                    key={markIndex} 
                    mark={mark} 
                    onValidClick={() => this.handleCellClick(gridIndex)} />
            })
            return <div className="row" key={rowIndex}>{cells}</div>
        })
        return (
            <div className="grid">{rows}</div>
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

Grid.utils = {
    // Split array of marks up into equal size chunks
    chunkArray: function(array, chunkSize) {
        let chunks = [], i, j;
        for (i=0, j=array.length; i<j; i+=chunkSize) {
            chunks.push(array.slice(i, i+chunkSize));
        }
        return chunks
    }
}

export default Grid
