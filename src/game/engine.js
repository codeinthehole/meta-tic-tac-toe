export const Rules = {

    calculateWinner: function(grids) {
        // Convert meta-grid into normal grid
        const wonGrids = grids.map(Rules.calculateGridWinner)
        return Rules.calculateGridWinner(wonGrids)
    },

    // Grid-level functions
    // --------------------

    _lines: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    // Test if a grid's outcome is decided
    isGridOutcomeDecided: function(marks) {
        // A grid outcome is decided if the grid either won or drawn
        return (
            Rules.isGridWon(marks) ||
            Rules.isGridDrawn(marks)
        )
    },

    // Test if a grid is drawn
    isGridDrawn: function(marks) {
        // A grid is drawn if all its lines are drawn
        const lines = Rules._lines
        for (let i = 0; i < lines.length; i++) {
            const line = [
                marks[lines[i][0]],
                marks[lines[i][1]],
                marks[lines[i][2]]
            ]
            if (!Rules.isLineDrawn(line)) {
                return false
            }
        }
        return true;
    },

    isGridWon: function(marks) {
        return Rules.calculateGridWinner(marks) !== null
    },

    calculateGridWinner: function(marks) {
        const lines = Rules._lines
        for (let i = 0; i < lines.length; i++) {
            const line = [
                marks[lines[i][0]],
                marks[lines[i][1]],
                marks[lines[i][2]]
            ]
            if (Rules.isLineWon(line)) {
                return line[0]
            }

            const [a, b, c] = lines[i];
            if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
                return marks[a];
            }
        }
        return null;
    },

    // Line-level functions
    // --------------------

    isLineDrawn: function(marks) {
        // A line is drawn if there is at least one O and X
        let foundX = false, foundO = false;
        for (let i = 0; i < marks.length; i++) {
            if (marks[i] == "X") {
                foundX = true
            } else if (marks[i] == "O") {
                foundO = true
            }
        }
        return foundX && foundO
    },

    isLineWon: function(marks) {
        return (marks[0] && marks[0] === marks[1] && marks[0] === marks[2]) 
    }

}
