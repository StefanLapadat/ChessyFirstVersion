import { Game, GameHistory } from "../Model/Game";
import 'jquery'
import { View } from "../View/View";
import { ConnectionWithServer } from "../Services/ConnectionWithServer";
import { GameState } from "../Model/GameState";
import { Player } from "../Model/Player";
import { PlayerColor } from "../../../CommonLib/Model/PlayerColor";

export class GameController{
    private game: Game = null;
    private view: View;
    private connection: ConnectionWithServer;

    public constructor(){
        var that = this;

        this.getPageInitializationDataFromServer().then(function(data: any){
            that.initPageFields(data);
            that.setEventHandlers();
        }).fail(function(data: any){
            alert("error");
        });
    }

    private getPageInitializationDataFromServer(){
        return $.ajax({
            url: "/PlayGame/PageInitializationData",
            method: "GET",
        });
    }

    private initPageFields(data: {game: {gameState: GameState, color: PlayerColor, opponent: Player }}){
        this.connection = new ConnectionWithServer(this);
        this.connection.setupConnection();
        this.view = new View();
        this.restoreGame(data);
        var color = this.game === null ? PlayerColor.White : this.game.color;
        this.view.initialize(color);
    }

    private setEventHandlers(): void{
        var that: GameController = this;

        $(document).on("click", ".start-new-game", function(){
            that.connection.startNewGame();
            that.view.waitingForOpponent();
        });

        $(document).on("click", ".offer-draw", function(){
            that.connection.offerDraw();
            that.game.drawOfferedToOpponent();
            that.view.offerDraw();
        });

        $(document).on("click", ".accept-draw", function(){
            that.connection.acceptDraw();
            that.game.drawFromOpponentAccepted();
            that.view.gameDrawnByAgreement();
        });

        $(document).on("click", ".decline-draw", function(){
            that.connection.declineDraw();
            that.game.drawFromOpponentDeclined();
            that.view.normalGameInProgress();
        });

        $(document).on("click", ".resign-game", function(){
            that.connection.resignGame();
            that.game.gameResigned();
            that.view.resignGame();
        });
    }

    private restoreGame(data: {game: {gameState: GameState, color: PlayerColor, opponent: Player }}): void{
        if(data.game){
            this.game = new Game(data.game.gameState, data.game.color, new GameHistory());
            this.view.initForGameInProgress(this.game);
        }else{
            this.view.initForNoCurrentGame();
        }
    }

    //Events from server
    public opponentMatched(data: {game: {gameState: GameState, color: PlayerColor, opponent: Player }}): void{
        this.game = new Game(data.game.gameState, data.game.color, new GameHistory());
        this.view.opponentMatched(data.game.opponent, data.game.color);
    }

    public opponentOfferedDraw(){
        this.view.opponentOfferedDraw();
        this.game.opponentOfferedDraw();
    }

    public opponentResigned(){
        this.view.opponentResigned();
        this.game.opponentResigned();
    }

    public opponentAcceptedDraw(){
        this.view.gameDrawnByAgreement();
        this.game.gameDrawnByAgreement();
    }

    public opponentDeclinedDraw(){
        this.view.opponentDeclinedDraw();
        this.game.opponentDeclinedDraw();
    }
}