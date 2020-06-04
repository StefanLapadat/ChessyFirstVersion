using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Core.Domain;
using Core.UserManagement;
using Ui.Infrastructure;


namespace Ui.Controllers{

    public class StatisticsController: Controller{
        public IActionResult Index(){
            return View();
        }
    }
}