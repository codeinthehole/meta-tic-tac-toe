State:

Boards * 9
    WhichSquareTaken
    WhoseTurn
    IsMoveAllowed
WhoseTurn
IsGameWon

Data structure for boards

- Conventions: use 0,1 for players

```
{
    "isGameWon": False,
    "activePlayer": 0,
    "boards": {
        "top-left": {
            "availableForMove": true,
            "marks": [null, 0, 1, 
                      null, null, null,
                      null, null, null]
        },
        "top": {
            "availableForMove": false,
            "marks": [null, null, null, 
                      null, null, null,
                      null, null, null]
        },
    }
```

# Actions:

`Move(player=0, board="top-left", markIndex=0)`

- Update boards
- Is game won?
- Update activePlayer

RenderGame
    RenderBoard *9

Actions:

Move(oldGame, movedBoard, 

# Components:

Board
    Grid
        Space
