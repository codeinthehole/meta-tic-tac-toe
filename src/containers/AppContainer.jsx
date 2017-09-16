import { connect } from 'react-redux'

import App from '../components/App'
import { clickCell, resetGame } from '../game/actions'


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
