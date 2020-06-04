
export enum GameState{
    WaitingForOpponent = 0,
    Normal = 1,

    OpponentOfferedDraw = 2,
    YouOfferedDraw = 3,
    OpponentResigned = 4,
    YouResigned = 5,
    OpponentWonByCheckmate = 6,
    YouWonByCheckmate = 7,
    GameDrawnByAgreement = 8
}