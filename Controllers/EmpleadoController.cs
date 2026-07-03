using Cavex.Principal.Models.EmpEmpleado;
using Cavex.Principal.Services.Interfaces;
using Cavex.Principal.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class EmpleadoController : Controller
    {
        private readonly IEmpEmpleadoService _service;
        private readonly Cavex.Principal.ApiClients.EmpCatColonia.IEmpCatColoniaApi _coloniaApi;
        private readonly Cavex.Principal.ApiClients.ICavexGeneralCatalogApi _catalogApi;
        private readonly ICatStatusService _statusService;

        public EmpleadoController(
            IEmpEmpleadoService service,
            Cavex.Principal.ApiClients.EmpCatColonia.IEmpCatColoniaApi coloniaApi,
            Cavex.Principal.ApiClients.ICavexGeneralCatalogApi catalogApi,
            ICatStatusService statusService)
        {
            _service = service;
            _coloniaApi = coloniaApi;
            _catalogApi = catalogApi;
            _statusService = statusService;
        }

        [HttpGet]
        public async Task<IActionResult> GetColonias(string? search, CancellationToken cancellationToken)
        {
            try
            {
                var pageSize = string.IsNullOrWhiteSpace(search) ? 15 : 100;
                var response = await _coloniaApi.GetAllAsync(1, pageSize, search, cancellationToken);
                if (response == null || !response.Success)
                {
                    return Json(new { success = false, message = response?.Message ?? "No se pudieron obtener las colonias." });
                }
                return Json(new { success = true, data = response.Data?.Items });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetColonia(int id, CancellationToken cancellationToken)
        {
            try
            {
                var response = await _coloniaApi.GetByIdAsync(id, cancellationToken);
                if (response == null || !response.Success)
                {
                    return Json(new { success = false, message = response?.Message ?? "No se pudo obtener la colonia." });
                }
                return Json(new { success = true, data = response.Data });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetGeneros(CancellationToken cancellationToken)
        {
            try
            {
                var response = await _catalogApi.GetGenerosAsync(1, 100, cancellationToken);
                if (response == null || !response.Success)
                {
                    return Json(new { success = false, message = response?.Message ?? "No se pudieron obtener los géneros." });
                }
                return Json(new { success = true, data = response.Data?.Items });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetEstadosCiviles(CancellationToken cancellationToken)
        {
            try
            {
                var response = await _catalogApi.GetEstadosCivilesAsync(1, 100, cancellationToken);
                if (response == null || !response.Success)
                {
                    return Json(new { success = false, message = response?.Message ?? "No se pudieron obtener los estados civiles." });
                }
                return Json(new { success = true, data = response.Data?.Items });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetNacionalidades(CancellationToken cancellationToken)
        {
            try
            {
                var response = await _catalogApi.GetNacionalidadesAsync(1, 100, cancellationToken);
                if (response == null || !response.Success)
                {
                    return Json(new { success = false, message = response?.Message ?? "No se pudieron obtener las nacionalidades." });
                }
                return Json(new { success = true, data = response.Data?.Items });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetStatus(CancellationToken cancellationToken)
        {
            var response = await _statusService.ObtenerTodosAsync(cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data?.Items });
        }

        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new CreateViewModel());
        }

        [HttpGet]
        public async Task<IActionResult> GetEmpleados(CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerTodosAsync(cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data?.Items });
        }

        [HttpGet]
        public async Task<IActionResult> GetEmpleado(int id, CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerPorIdAsync(id, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> SaveEmpleado([FromBody] EmpEmpleadoSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            var response = await _service.CrearAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateEmpleado(int id, [FromBody] EmpEmpleadoSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            var response = await _service.ActualizarAsync(id, model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteEmpleado(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { success = true, data = response.Data });
        }
    }
}

    
