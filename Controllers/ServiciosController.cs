using Cavex.Principal.Models.ServicioAClientes;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class ServiciosController : Controller
    {
        private readonly IServicioAClientesService _service;
        private readonly ICatStatusService _catStatusService;
        private static (List<CatServicioSaveDto> Items, DateTime Expiration)? _servicesCache;
        private static readonly object _servicesLock = new();

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
            lock (_servicesLock)
            {
                if (_servicesCache != null && _servicesCache.Value.Expiration > DateTime.UtcNow)
                {
                    return Json(new { success = true, data = _servicesCache.Value.Items });
                }
            }

            var response = await _service.ObtenerTodosAsync(1, 100, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<CatServicioSaveDto>();
            lock (_servicesLock)
            {
                _servicesCache = (items, DateTime.UtcNow.AddSeconds(15));
            }

            return Json(new { success = true, data = items });
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
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_servicesLock)
            {
                _servicesCache = null;
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateService([FromBody] CatServicioSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = GetModelStateErrors() });
            }

            var response = await _service.ActualizarAsync(model.Id, model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_servicesLock)
            {
                _servicesCache = null;
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteService(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_servicesLock)
            {
                _servicesCache = null;
            }

            return Json(new { success = true, data = response.Data });
        }

        private string GetModelStateErrors()
        {
            return string.Join(" ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
        }
    }
}
