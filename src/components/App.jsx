import React from 'react';
import PropTypes from 'prop-types';

import MultiGrid from "./MultiGrid"

class App extends React.Component {

    render() {
        return (
            <div id="app">
                <h1>Meta-tic-tac-toe!</h1>
                {this.renderGameSummary()}
                <p><a href="#" onClick={this.props.onReset}>Reset</a></p>
                <MultiGrid 
                    grids={this.props.grids} 
                    completeGrids={this.props.completeGrids}
                    availableGrids={this.props.availableGrids}
                    onCellClick={this.props.onCellClick} />
                {this.renderHistory()}
                <div>
                    Code available at <a href="https://github.com/codeinthehole/meta-tic-tac-toe">https://github.com/codeinthehole/meta-tic-tac-toe</a>
                </div>
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

    renderHistory() {
        if (!this.props.events) {
            return null
        }
        const listItems = this.props.events.map(function(item) {return <li>{item.description}</li>})
        return <ul>{listItems}</ul>
    }

}

App.propTypes = {
    nextMark: PropTypes.string.isRequired,
    grids: PropTypes.array.isRequired,
    completeGrids: PropTypes.array.isRequired,
    availableGrids: PropTypes.array.isRequired,
    winner: PropTypes.string,
    events: PropTypes.array.isRequired,
    
    onCellClick: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
}

export default App
