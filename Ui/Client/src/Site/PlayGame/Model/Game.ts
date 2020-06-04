import { GameState } from "./GameState";
import { PlayerColor } from "../../../CommonLib/Model/PlayerColor";

export class Game{
    public history: GameHistory;
    public state: GameState;
    public color: PlayerColor;

    public constructor(state: GameState, color: PlayerColor, history: GameHistory) {
        this.state = state;
        this.color = color;
        this.history = history;
    }

    public drawOfferedToOpponent(): void{
       this.state = GameState.YouOfferedDraw;
    }

    public opponentOfferedDraw(): void{
        this.state = GameState.OpponentOfferedDraw;
    }

    public drawFromOpponentAccepted(): void{
        this.state = GameState.GameDrawnByAgreement;
    }

    public drawFromOpponentDeclined(): void{
       this.state = GameState.Normal;
    }

    public gameResigned(): void{
       this.state = GameState.YouResigned;
    }

    public opponentResigned(): void{
        this.state = GameState.OpponentResigned;
    }

    public gameDrawnByAgreement(): void{
        this.state = GameState.GameDrawnByAgreement;
    }

    public opponentDeclinedDraw(): void{
        this.state = GameState.Normal;
    }

    public makeMove(move: GameMove): void{
        
    }
}


export class GameHistory{
    public moves: GameMove[];
}

export class GameMove{

}



