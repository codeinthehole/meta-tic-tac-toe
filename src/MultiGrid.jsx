import React from 'react';
import PropTypes from 'prop-types';

import Grid from './Grid'


class MultiGrid extends React.Component {

    render() {
        return (
            <div className="multi-grid">{this.renderRows()}</div>
        )
    }

    renderRows() {
        // Split marks up into rows
        const chunkedGrids = Grid.utils.chunkArray(this.props.grids, this.props.size)

        // Render each row as a set of Grids
        return chunkedGrids.map((grids, rowIndex) => {
            return this.renderRow(grids, rowIndex)
        })
    }

    renderRow(gridsList, rowIndex) {
        let grids = gridsList.map((marks, index) => {
            const gridIndex = rowIndex * this.props.size + index
            return this.renderGrid(gridIndex, marks)
        })
        return <div className="multi-grid-row" key={rowIndex}>{grids}</div>
    }

    renderGrid(gridIndex, marks) {
        console.log(gridIndex, this.props.nextGridIndex)
        return <Grid 
            key={gridIndex} 
            marks={marks} 
            active={gridIndex == this.props.nextGridIndex}
            onCellClick={(cellIndex) => this.props.onCellClick(gridIndex, cellIndex)} />
    }
}

MultiGrid.propTypes = {
    size: PropTypes.number,
    grids: function(props, propName, componentName) {
        // Check the right number of grids are passed in
        let size = props.size;
        let expectedNumGrids = size * size;
        let actualNumGrids = props[propName].length;1
        if (actualNumGrids !== expectedNumGrids) {
            let msg = `${actualNumGrids} grids passed in but ${expectedNumGrids} are required`
            throw new Error(msg)
        }
    },
    onCellClick: PropTypes.func,
    nextGridIndex: PropTypes.number,
}

MultiGrid.defaultProps = {
    size: 3,
    nextGridIndex: null,
}

MultiGrid.utils = {
    // Split array of marks up into equal size chunks
    chunkArray: function(array, chunkSize) {
        let chunks = [], i, j;
        for (i=0, j=array.length; i<j; i+=chunkSize) {
            chunks.push(array.slice(i, i+chunkSize));
        }
        return chunks
    }
}

export default MultiGrid
