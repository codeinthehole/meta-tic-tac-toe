// A container component that simply connects a plain React component
// to the Redux store.
import { connect } from 'react-redux'

import App from '../components/App'
import { clickCell, resetGame } from '../game/actions'


const mapStateToProps = state => {
    return {
        nextMark: state.nextMark,
        grids: state.grids,
        completeGrids: state.completeGrids,
        availableGrids: state.availableGrids,
        events: state.events,
        winner: state.winner,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCellClick: (gridIndex, cellIndex) => dispatch(
            clickCell(gridIndex, cellIndex)
        ),
        onReset: () => dispatch(
            resetGame()
        ),
    }
}

const AppContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(App)

export default AppContainer
