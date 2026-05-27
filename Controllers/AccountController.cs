using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login() => RedirectToAction("Index", "Home");
        
        [HttpPost]
        public IActionResult Logout() => RedirectToAction("Index", "Home");
    }
}
