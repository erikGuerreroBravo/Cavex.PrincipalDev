    using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login() => View();

        [HttpPost]
        public IActionResult Logout() => RedirectToAction("Index", "Home");

        public IActionResult Registro()
        {
            return View();
        }

        public IActionResult OlvidasteContra()
        {
            return View();
        }
    }
}
