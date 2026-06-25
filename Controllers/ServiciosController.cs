using Cavex.Principal.Models.ServicioAClientes;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class ServiciosController : Controller
    {
        private readonly IServicioAClientesService _service;
        private readonly ICatStatusService _catStatusService;

        public ServiciosController(IServicioAClientesService service, ICatStatusService catStatusService)
        {
            _service = service;
            _catStatusService = catStatusService;
        }

        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetServices(CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerTodosAsync(cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data?.Items }
                : new { success = false, message = response.Message });
        }

        [HttpGet]
        public async Task<IActionResult> GetStatus(CancellationToken cancellationToken)
        {
            var response = await _catStatusService.ObtenerTodosAsync(cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data?.Items }
                : new { success = false, message = response.Message });
        }

        [HttpPost]
        public async Task<IActionResult> SaveService([FromBody] CatServicioSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = GetModelStateErrors() });
            }

            var response = await _service.CrearAsync(model, cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data }
                : new { success = false, message = response.Message });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateService([FromBody] CatServicioSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = GetModelStateErrors() });
            }

            var response = await _service.ActualizarAsync(model.Id, model, cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data }
                : new { success = false, message = response.Message });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteService(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data }
                : new { success = false, message = response.Message });
        }

        private string GetModelStateErrors()
        {
            return string.Join(" ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
        }
    }
}
