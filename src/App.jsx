import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { clickCell } from './actions'
import MultiGrid from "./MultiGrid"

class App extends React.Component {

    render() {
        return (
            <div id="app">
                <h1>Meta-noughts-and-crosses</h1>
                {this.renderGameSummary()}
                <MultiGrid 
                    grids={this.props.grids} 
                    completeGrids={this.props.completeGrids}
                    availableGrids={this.props.availableGrids}
                    onCellClick={this.props.onCellClick} />
            </div>
        )
    }

    renderGameSummary() {
        // todo
        const winner = null
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
    onCellClick: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        nextMark: state.nextMark,
        grids: state.grids,
        completeGrids: state.completeGrids,
        availableGrids: state.availableGrids,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCellClick: (gridIndex, cellIndex) => dispatch(clickCell(gridIndex, cellIndex))
    }
}

const ConnectedApp = connect(
    mapStateToProps, 
    mapDispatchToProps
)(App)

export default ConnectedApp
