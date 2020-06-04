using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain;
using Core.UserManagement;
using Ui.Infrastructure;
using Ui.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Ui.Controllers{

    public class PlayGameController: Controller {
        private CurrentlyPlayedGames _games;
        private UserManager<AppUser> _userManager;

        public PlayGameController(CurrentlyPlayedGames games, UserManager<AppUser> userManager){
            this._games = games;
            this._userManager = userManager;
        }

        public IActionResult Index(){
            return View();
        }
        
        public async Task<IActionResult> PageInitializationData(){
            var user = await GetAppUser();
            var game = _games.FindGameByUser(user);
            var gameViewModel = (GameViewModel)null;

            if(game!=null){
                gameViewModel = new GameViewModel(game, user);
            }
        
            return Json(new {
                game = gameViewModel
            });
        }

        private async Task<AppUser> GetAppUser(){
            var t = await _userManager.GetUserAsync(User);
            return t;
        }
    }
}