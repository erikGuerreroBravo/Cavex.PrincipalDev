using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class ParametrosCostoController : Controller
    {
        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View("~/Views/ParametrosCostos/Index.cshtml");
        }

        public IActionResult Create() => View("~/Views/ParametrosCostos/Create.cshtml");
        public IActionResult Details(int id) => View("~/Views/ParametrosCostos/Details.cshtml");
    }
}
