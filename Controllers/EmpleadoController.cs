using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class EmpleadoController : Controller
    {
        public IActionResult CrearEmpleado()
        {
            return View("~/Views/Empleado/CrearEmpleado.cshtml");
        }
    }
}
