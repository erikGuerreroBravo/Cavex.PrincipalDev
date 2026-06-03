using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

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
