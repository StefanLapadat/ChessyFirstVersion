import { Game } from "../Model/Game";
import { GameState } from "../Model/GameState";
import { Player } from "../Model/Player";
import 'jquery';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PlayerColor } from "../../../CommonLib/Model/PlayerColor";
import { TableConfigurations } from "../../../CommonLib/Model/ChessyTable/TableConfigurations";
import { ChessTable } from "../../../CommonLib/Components/Table/ChessTable";
import { ChessyTable } from "../../../CommonLib/Model/ChessyTable/ChessyTable";

export class View{

    private table: ChessyTable;

    public initialize(color: PlayerColor){
        var that = this;
        $(document).ready(function(){
            that.addTable(color);
        });

        ReactDOM.render(
            <ChessTable
            blackcolor="123456"
            whitecolor="eddcad"
            color= {PlayerColor.White}
            numCols= {10}
            numRows= {15}
            figures= {TableConfigurations.StandardConfiguration()}
            draggableFigures= {true}
            />,
            document.getElementById("example")
        );
    }

    public addTable(color: PlayerColor = PlayerColor.White){
        this.table = new ChessyTable(color);
        var tableWrapper = document.getElementById('main-chess-table-wrapper');
        if(tableWrapper.hasChildNodes){
            tableWrapper.firstChild.remove();
        }
        
        tableWrapper
        .appendChild(this.table.tableWithFigures(TableConfigurations.StandardConfiguration(), color, true));
    }

    public initForNoCurrentGame() {
        $('.game-controlls')
        .html('<button class="btn btn-warning btn-block start-new-game">Start new game</button>');
    }

    public initForGameInProgress(game: Game) {

        switch(game.state){
            case GameState.Normal:
                this.initForNormal();
            break;
            case GameState.OpponentOfferedDraw:
                this.initForOpponentOfferedDraw();
            break;
            case GameState.OpponentResigned:
                this.initForOpponentResigned();
            break;
            case GameState.OpponentWonByCheckmate: 
                this.initForOpponentWonByCheckmate();
            break;
            case GameState.WaitingForOpponent: 
                this.initForWaitingForOpponent();
            break;
            case GameState.YouOfferedDraw: 
                this.initForYouOfferedDraw();
            break;
            case GameState.YouResigned: 
                this.initForYouResigned();
            break;
            case GameState.YouWonByCheckmate: 
                this.initForYouWonByCheckmate();
            break;
            case GameState.GameDrawnByAgreement:
                this.initForGameDrawnByAgreement();
        }
    }

    public initForNormal(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block offer-draw">Offer draw</button>\
            <button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public initForOpponentOfferedDraw(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block accept-draw"> \
            Accept draw </button>\
            <button class="btn btn-warning btn-block decline-draw"> \
            Decline draw </button>');
    }

    public initForOpponentResigned(): void {
        
    }

    public initForOpponentWonByCheckmate(): void {
        
    }

    public initForWaitingForOpponent(): void {
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block"> \
            Waiting for opponent <i class="fa fa-spin fa-spinner"></i></button>');
    }

    public initForYouOfferedDraw(): void {
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public initForYouResigned(): void {
        
    }

    public initForYouWonByCheckmate(): void {
        
    }

    public initForGameDrawnByAgreement(): void {
        
    }
    
    public waitingForOpponent(){
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block"> \
            Waiting for opponent <i class="fa fa-spin fa-spinner"></i></button>');
    }

    public opponentMatched(opponent: Player, color: PlayerColor): void{
        this.addTable(color);
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block offer-draw">Offer draw</button>\
            <button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public opponentOfferedDraw(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block accept-draw"> \
            Accept draw </button>\
            <button class="btn btn-warning btn-block decline-draw"> \
            Decline draw </button>');
    }

    public opponentResigned(): void {
        $('.game-controlls')
        .html('<button class="btn btn-warning btn-block start-new-game">Start new game</button>');        
    }

    public gameDrawnByAgreement(): void{
        $('.game-controlls')
        .html('<button class="btn btn-warning btn-block start-new-game">Start new game</button>');
    }

    public opponentDeclinedDraw(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block offer-draw">Offer draw</button>\
            <button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public offerDraw(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public normalGameInProgress(): void{
        $('.game-controlls')
            .html('<button class="btn btn-warning btn-block offer-draw">Offer draw</button>\
            <button class="btn btn-warning btn-block resign-game">Resign</button>');
    }

    public resignGame() {
        $('.game-controlls')
        .html('<button class="btn btn-warning btn-block start-new-game">Start new game</button>');
    }
}
