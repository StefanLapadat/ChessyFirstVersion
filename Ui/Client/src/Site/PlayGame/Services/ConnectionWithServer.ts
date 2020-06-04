import * as signalR from '@aspnet/signalr';
import { GameController } from '../Controller/GameController';
import { GameState } from '../Model/GameState';
import { Player } from '../Model/Player';
import { PlayerColor } from '../../../CommonLib/Model/PlayerColor';

export class ConnectionWithServer {
    private conn: signalR.HubConnection;
    private gameController: GameController;
    
    public constructor(gameController: GameController){
        this.gameController = gameController;
    }

    public setupConnection(): void{
        this.conn = new signalR.HubConnectionBuilder()
                    .withUrl("/gamehub")
                    .build();

        var that = this;
        
        this.conn.on("StartedGameAsBlack", function(data: {game: {gameState: GameState, color: PlayerColor, opponent: Player }}){
            that.gameController.opponentMatched(data);
        });

        this.conn.on("StartedGameAsWhite", function(data: {game: {gameState: GameState, color: PlayerColor, opponent: Player }}){
            that.gameController.opponentMatched(data);
        });

        this.conn.on("OpponentHasOfferedADraw", function(){
            that.gameController.opponentOfferedDraw();
        });
        
        this.conn.on("GameDrawnByAgreement", function(){
            that.gameController.opponentAcceptedDraw();
        });
        
        this.conn.on("OpponentHasResigned", function(){
            that.gameController.opponentResigned();
        });
        
        this.conn.on("OpponentDeclinedDraw", function(){
            that.gameController.opponentDeclinedDraw();
        });

        this.conn.start();
    }
    
    startNewGame(){
        this.conn.invoke("StartGame");
    }

    offerDraw(){
        this.conn.invoke("OfferDraw");
    }

    acceptDraw(){
        this.conn.invoke("AcceptDraw");
    }

    declineDraw(){
        this.conn.invoke("DeclineDraw");
    }

    resignGame(){
        this.conn.invoke("Resign");
    }
}