using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class SucursalesController : Controller
    {
        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View();
        }

        public IActionResult Create() => View();
        public IActionResult Edit(int id) => View("Editar");
    }
}
