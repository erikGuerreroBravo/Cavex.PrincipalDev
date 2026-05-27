using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
