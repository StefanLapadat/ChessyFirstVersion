using System.Collections.Generic;
using System.Collections;
using Core.UserManagement;
using System.Linq;

namespace Core.Domain{

    public class CurrentlyPlayedGames {
        private LinkedList<Game> _games = new LinkedList<Game>();
        
        public void AddNewGame(Game g){
            lock(this){
                _games.AddLast(g);
            }
        }

        public void RemoveGame(Game g){
            lock(this){
                _games.Remove(g);
            }
        }

        public Game FindGameByUser(AppUser user){
            lock(this){
                return _games.Where(a => (a?.White?.User != null && a.White.User.Id.Equals(user.Id)) || 
                    (a?.Black?.User != null && a.Black.User.Id.Equals(user.Id))).FirstOrDefault();
            }
        }

        public bool MatchPlayer(Player p){
            lock(this){
                var openGames = _games.Where(a => a.Black == null);
                if(openGames.Any()){
                    var openGame = openGames.First();
                    openGame.Black = p;
                    openGame.GameState = GameState.Normal;
                    return true;
                }else{
                    Game g = new Game(){
                        White = p
                    };
                    this.AddNewGame(g);

                    return false;
                }
                
            }
        }
    }
}