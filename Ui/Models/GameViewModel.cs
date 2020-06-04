using Core.Domain;
using Core.UserManagement;

namespace Ui.Models{
    public class GameViewModel{
        public string Opponent { get; set; }
        public GameState GameState { get; set; }
        public PlayerPosition Color { get; set; }

        public GameViewModel(Game game, AppUser user){
            Opponent = game.Opponent(user)?.UserName;
            Color = user.Id == game.White?.User.Id ? PlayerPosition.White : PlayerPosition.Black;

            switch(game.GameState){

                //Normal
                case Core.Domain.GameState.Normal: 
                    this.GameState = GameState.Normal; 
                    break;

                //Draws
                case Core.Domain.GameState.BlackOfferedDraw when Color == PlayerPosition.White:
                    this.GameState = GameState.OpponentOfferedDraw;
                    break;
                case Core.Domain.GameState.BlackOfferedDraw when Color == PlayerPosition.Black:
                    this.GameState = GameState.YouOfferedDraw;
                    break;
                case Core.Domain.GameState.WhiteOfferedDraw when Color == PlayerPosition.White:
                    this.GameState = GameState.YouOfferedDraw;
                    break;
                case Core.Domain.GameState.WhiteOfferedDraw when Color == PlayerPosition.Black:
                    this.GameState = GameState.OpponentOfferedDraw;
                    break;
                case Core.Domain.GameState.GameDrawnByAgreement:
                    this.GameState = GameState.GameDrawnByAgreement;
                    break;

                 //Resignitions
                case Core.Domain.GameState.BlackResigned when Color == PlayerPosition.White:
                    this.GameState = GameState.OpponentResigned;
                    break;
                case Core.Domain.GameState.BlackResigned when Color == PlayerPosition.Black:
                    this.GameState = GameState.YouResigned;
                    break;
                case Core.Domain.GameState.WhiteResigned when Color == PlayerPosition.White:
                    this.GameState = GameState.YouResigned;
                    break;
                case Core.Domain.GameState.WhiteResigned when Color == PlayerPosition.Black:
                    this.GameState = GameState.OpponentResigned;
                    break;

                //Checkmates
                case Core.Domain.GameState.WhiteWonByCheckmate when Color == PlayerPosition.White:
                    this.GameState = GameState.YouWonByCheckmate;
                    break;
                case Core.Domain.GameState.WhiteWonByCheckmate when Color == PlayerPosition.Black:
                    this.GameState = GameState.OpponentWonByCheckmate;
                    break;
                case Core.Domain.GameState.BlackWonByCheckmate when Color == PlayerPosition.White:
                    this.GameState = GameState.OpponentWonByCheckmate;
                    break;
                case Core.Domain.GameState.BlackWonByCheckmate when Color == PlayerPosition.Black:
                    this.GameState = GameState.OpponentWonByCheckmate;
                    break;

                //White waits for opponent
                case Core.Domain.GameState.WhiteWaitsForOpponent when Color == PlayerPosition.White:
                    this.GameState = GameState.WaitingForOpponent;
                    break;
            }
        }
    }
}