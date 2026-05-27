using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class CotizacionesController : Controller
    {
        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View();
        }

        public IActionResult Create() => View();
        public IActionResult Details(int id) => View();
    }
}
