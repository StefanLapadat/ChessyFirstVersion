using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Core.UserManagement;
using Core.Domain;
using Ui.Infrastructure;
using Ui.Models;

namespace Ui.Hubs{

    [Authorize]
    public class GameHub: Hub{
        
        private CurrentlyPlayedGames _games;
        private ConnectionUserMapping _map;
        private UserManager<AppUser> _userManager;

        public GameHub(CurrentlyPlayedGames games, ConnectionUserMapping map, 
            UserManager<AppUser> userManager){

            this._games = games;
            this._map = map;
            this._userManager = userManager;
        }

        public async override Task OnConnectedAsync(){
            var user = await GetAppUser();
            _map[user.Id] = Context.ConnectionId;
        }

      /*  public async override Task OnDisconnectedAsync(Exception e){
            
            
        }
    */ 

        public async Task StartGame()
        {
            var user = await GetAppUser();

            if(_games.FindGameByUser(user) != null){
                //In the game allready.
            } else {
                Player p = new Player{
                    User = user
                };

                if(_games.MatchPlayer(p)){
                    Game g = _games.FindGameByUser(user);

                    GameViewModel gameFromPerspectiveOfBlack = new GameViewModel(g, user);
                    await Clients.Caller.SendAsync("StartedGameAsBlack", new {game = gameFromPerspectiveOfBlack});

                    GameViewModel gameFromPerspectiveOfWhite = new GameViewModel(g, g.White.User);
                    var whiteUserId = _games.FindGameByUser(user).White.User.Id;
                    var whiteConnectionId = _map[whiteUserId];
                    await Clients.Client(whiteConnectionId).SendAsync("StartedGameAsWhite", new { game = gameFromPerspectiveOfWhite });
                }
            }
        }

        public async Task OfferDraw(){
            var user = await GetAppUser();
            var currentGame = _games.FindGameByUser(user);

            if(currentGame == null){
                //No game.
            } 
            else {
                var opponent = currentGame.Opponent(user);
                if(opponent == null){
                    //No opponent yet.
                }
                else{
                    var opponentUserId = opponent.Id;
                    var opponentConnectionId = _map[opponentUserId];
                    if(currentGame.OfferDrawToOpponent(user)){
                        await Clients.Client(opponentConnectionId).SendAsync("OpponentHasOfferedADraw");
                    }else{
                        //Offer was allready offered or simmilar.
                    }
                }
            }
        }

        public async Task AcceptDraw(){
            var user = await GetAppUser();
            var currentGame = _games.FindGameByUser(user);

            if(currentGame == null){
                //Not participating in a game.
            } 
            else {
                var opponent = currentGame.Opponent(user);
                if(opponent == null){
                    //No opponent yet.
                }
                else{
                    var opponentUserId = opponent.Id;
                    var opponentConnectionId = _map[opponentUserId];
                    if(currentGame.AcceptDrawFromOpponent(user)){
                        _games.RemoveGame(currentGame);
                        await Clients.Caller.SendAsync("GameDrawnByAgreement");
                        await Clients.Client(opponentConnectionId).SendAsync("GameDrawnByAgreement");
                    }else{
                        //Could not accept draw. There was no offer from opponent.
                    }
                }
            }
        }

        public async Task DeclineDraw(){
            var user = await GetAppUser();
            var currentGame = _games.FindGameByUser(user);

            if(currentGame == null){
                //No game.
            } 
            else {
                var opponent = currentGame.Opponent(user);
                if(opponent == null){
                    //No opponent.
                }
                else{
                    var opponentUserId = opponent.Id;
                    var opponentConnectionId = _map[opponentUserId];
                    if(currentGame.DeclineDrawOffer(user)){
                        await Clients.Client(opponentConnectionId).SendAsync("OpponentDeclinedDraw");
                    }else{
                        //No draw to decline.
                    }
                }
            }
        }

        public async Task Resign(){
            var user = await GetAppUser();
            var currentGame = _games.FindGameByUser(user);

            if(currentGame == null){
                //No game to resign.
            } 
            else {
                var opponent = currentGame.Opponent(user);
                if(opponent == null){
                    //No opponent yet to resign.
                }
                else{
                    var opponentUserId = opponent.Id;
                    var opponentConnectionId = _map[opponentUserId];
                    currentGame.Resign(user);
                    _games.RemoveGame(currentGame);
                    await Clients.Caller.SendAsync("YouResignedTheGame");
                    await Clients.Client(opponentConnectionId).SendAsync("OpponentHasResigned");
                }
            }
        }


        public void PlayAMove()
        {
            
        }

        private async Task<AppUser> GetAppUser(){
            var t = await _userManager.GetUserAsync(Context.User);
            return t;
        }
    }
}