using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class VehiculosController : Controller
    {
        [HttpGet("/Vehiculos")]
        [HttpGet("/Vehiculos/Index")]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        // Pantalla frontend de captura; no consulta ni persiste servicios todavía.
        [HttpGet("/Vehiculos/NuevoServicio")]
        public IActionResult NuevoServicio()
        {
            return View();
        }

        // Centro frontend de documentos; la acción solo entrega la vista simulada.
        [HttpGet("/Vehiculos/Documentos")]
        public IActionResult Documentos()
        {
            return View();
        }

        // Pantalla frontend de infracciones; no consulta ni guarda información todavía.
        [HttpGet("/Vehiculos/Infracciones")]
        public IActionResult Infracciones()
        {
            return View();
        }

        // Pantalla frontend de cargas de combustible; no persiste datos todavía.
        [HttpGet("/Vehiculos/Gasolina")]
        public IActionResult Gasolina()
        {
            return View();
        }

        // Pantalla frontend de control de llantas; usa datos simulados hasta implementar endpoints reales.
        [HttpGet("/Vehiculos/Llantas")]
        public IActionResult Llantas()
        {
            return View();
        }

        // Pantalla frontend de daños y accidentes; no consulta ni persiste eventos todavía.
        [HttpGet("/Vehiculos/DaniosAccidentes")]
        public IActionResult DaniosAccidentes()
        {
            return View();
        }

        // Pantalla frontend de asignaciones; usa datos simulados hasta implementar los endpoints reales.
        [HttpGet("/Vehiculos/Asignaciones")]
        public IActionResult Asignaciones()
        {
            return View();
        }

        // Pantalla temporal de detalle; conserva el id opcional para la futura adaptación.
        [HttpGet("/Vehiculos/Detalle/{id:int?}")]
        public IActionResult Detalle(int? id)
        {
            ViewData["VehiculoId"] = id ?? 1;
            return View();
        }
    }
}
