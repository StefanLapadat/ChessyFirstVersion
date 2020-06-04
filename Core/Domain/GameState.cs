namespace Core.Domain{
    public enum GameState{
        WhiteWaitsForOpponent = 0,
        Normal = 1,
        WhiteOfferedDraw = 2,
        BlackOfferedDraw = 3,
        WhiteResigned = 4,
        BlackResigned = 5,
        WhiteWonByCheckmate = 6,
        BlackWonByCheckmate = 7,
        GameDrawnByAgreement = 8
    }
}