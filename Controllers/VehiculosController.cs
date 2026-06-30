using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class VehiculosController : Controller
    {
        public IActionResult Detalle()
        {
            return View();
        }
    }
}
