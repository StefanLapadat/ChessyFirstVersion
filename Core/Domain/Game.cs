using Core.UserManagement;


//TO DO: Lock all methods!
namespace Core.Domain
{
    public class Game
    {
        public Player White { get; set; }
        public Player Black { get; set; }

        public GameState GameState { get; set; }

        public AppUser Opponent(AppUser user){
            if(White?.User?.Id == user.Id){
                return Black?.User;
            }
            if(Black?.User?.Id == user.Id){
                return White?.User;
            }

            throw new System.Exception("User is not participating in this game.");
        }

        public bool OfferDrawToOpponent(AppUser user){
            try{
                var opponent = Opponent(user);
                if(White.User == opponent){
                    return OfferDrawToWhite();
                }else {
                    return OfferDrawToBlack();
                }
            }catch{
                return false;
            }
        }

        public bool OfferDrawToBlack(){
            if( GameState == GameState.WhiteOfferedDraw | GameState == GameState.BlackOfferedDraw){
                return false;
            }
            
            GameState = GameState.WhiteOfferedDraw;

            return true;
        }

        public bool OfferDrawToWhite(){
            if(GameState == GameState.WhiteOfferedDraw | GameState == GameState.BlackOfferedDraw){
                return false;
            }
            
            GameState = GameState.BlackOfferedDraw;

            return true;
        }

        public bool AcceptDrawFromOpponent(AppUser user){
            try{
                var opponent = Opponent(user);
                if(White.User == opponent){
                    return AcceptDrawOfferFromWhite();
                }else {
                    return AcceptDrawOfferFromBlack();
                }
            }catch{
                return false;
            }
        }

        public bool AcceptDrawOfferFromBlack(){
            if(GameState != GameState.BlackOfferedDraw){
                return false;
            }
            
            GameState = GameState.GameDrawnByAgreement;

            return true;
        }

        public bool AcceptDrawOfferFromWhite(){
            if(GameState != GameState.WhiteOfferedDraw){
                return false;
            }
            
            GameState = GameState.GameDrawnByAgreement;

            return true;
        }

        public bool DeclineDrawOffer(AppUser user){
            var opponent = Opponent(user);
            if ((White.User?.Id == opponent.Id && GameState == GameState.WhiteOfferedDraw) || 
                (Black.User?.Id == opponent.Id && GameState == GameState.BlackOfferedDraw)){
                    GameState = GameState.Normal;
                    return true;
            }
            return false;
        }

        public void Resign(AppUser user){
            if(White.User?.Id == user?.Id){
                GameState = GameState.WhiteResigned;
            } else {
                GameState = GameState.BlackResigned;
            }
        }
    }
}
