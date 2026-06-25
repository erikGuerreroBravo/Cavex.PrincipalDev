using Cavex.Principal.Models.CatSucursal;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class SucursalesController : Controller
    {
        private readonly ISucursalesService _service;
        private readonly ICatStatusService _catStatusService;

        public SucursalesController(ISucursalesService service, ICatStatusService catStatusService)
        {
            _service = service;
            _catStatusService = catStatusService;
        }

        public IActionResult Index(int pagina = 1)
        {
            ViewBag.PaginaActual = pagina;
            return View(new CatSucursalSaveDto());
        }

        [HttpGet]
        public async Task<IActionResult> GetSucursales(CancellationToken cancellationToken)
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
        public async Task<IActionResult> SaveSucursal([FromBody] CatSucursalSaveDto model, CancellationToken cancellationToken)
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
        public async Task<IActionResult> UpdateSucursal([FromBody] CatSucursalEditDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, message = GetModelStateErrors() });
            }

            var saveModel = new CatSucursalSaveDto
            {
                StrValor = model.StrValor,
                StrDescripcion = model.StrDescripcion,
                IdCatStatus = model.IdCatStatus
            };

            var response = await _service.ActualizarAsync(model.Id, saveModel, cancellationToken);

            return Json(response.Success
                ? new { success = true, data = response.Data }
                : new { success = false, message = response.Message });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteSucursal(int id, CancellationToken cancellationToken)
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
