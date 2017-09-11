import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell'


class Grid extends React.Component {

    render() {
        // Determiner the class of this grid
        let statusClass = this.props.isAvailable ? "active" : ""
        if (this.props.isOutcomeDecided) {
            statusClass = "complete"
        }
        return (
            <div className={`grid ${statusClass}`}>{this.renderRows()}</div>
        )
    }

    renderRows() {
        // Split marks up into rows
        const chunkedMarks = Grid.utils.chunkArray(this.props.marks, this.props.size)

        // Render each row as a set of Cells
        return chunkedMarks.map((marks, rowIndex) => {
            return this.renderRow(marks, rowIndex)
        })
    }

    renderRow(marks, rowIndex) {
        let cells = marks.map((mark, markIndex) => {
            const gridIndex = rowIndex * this.props.size + markIndex
            return this.renderCell(gridIndex, mark)
        })
        return <div className="row" key={rowIndex}>{cells}</div>
    }

    renderCell(index, mark) {
        return <Cell 
            key={index} 
            mark={mark} 
            onClick={() => this.props.onCellClick(index)} />
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
    // Whether moves are allowed in this grive
    isAvailable: PropTypes.bool,
    // Whether this grid's outcome is decided
    isOutcomeDecided: PropTypes.bool,
    // Event handler for clicking on a cell
    onCellClick: PropTypes.func,
}

Grid.defaultProps = {
    marks: [
        null, null, null,
        null, null, null,
        null, null, null,
    ],
    isAvailable: false,
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
