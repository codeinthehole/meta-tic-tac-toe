import React from 'react';
import PropTypes from 'prop-types';

import MultiGrid from "./MultiGrid"


class App extends React.Component {

    render() {
        return (
            <div id="app">
                <h1>Meta-noughts-and-crosses</h1>
                {this.renderGameSummary()}
                <p><a href="#" onClick={this.props.onReset}>Reset</a></p>
                <MultiGrid 
                    grids={this.props.grids} 
                    completeGrids={this.props.completeGrids}
                    availableGrids={this.props.availableGrids}
                    onCellClick={this.props.onCellClick} />
            </div>
        )
    }

    renderGameSummary() {
        const winner = this.props.winner
        if (winner) {
            return <p>Winner is {winner}</p>
        } else {
            return <p>Next player: {this.props.nextMark}</p>
        }
    }
}

App.propTypes = {
    nextMark: PropTypes.string.isRequired,
    grids: PropTypes.array.isRequired,
    completeGrids: PropTypes.array.isRequired,
    availableGrids: PropTypes.array.isRequired,
    winner: PropTypes.string,
    
    onCellClick: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
}

export default App
