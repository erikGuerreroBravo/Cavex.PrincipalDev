using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Cavex.Principal.Controllers
{
    public class MarcasController : Controller
    {
        private readonly IVehCatMarcaVehiculoService _service;
        private readonly IMemoryCache _cache;
        private const string CacheKey = "marcas_list";

        public MarcasController(IVehCatMarcaVehiculoService service, IMemoryCache cache)
        {
            _service = service;
            _cache = cache;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetMarcas(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _service.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatMarcaVehiculoDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }

        [HttpPost]
        public async Task<JsonResult> SaveMarca([FromBody] VehCatMarcaVehiculoSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            var exists = await _service.ExistePorNombreAsync(
                model.StrValor.Trim(),
                null,
                cancellationToken);

            if (exists)
            {
                return Json(new { success = false, message = "El nombre de la marca ya existe." });
            }

            var response = await _service.CrearAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<JsonResult> UpdateMarca([FromBody] VehCatMarcaVehiculoEditDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            var exists = await _service.ExistePorNombreAsync(
                model.StrValor.Trim(),
                model.Id,
                cancellationToken);

            if (exists)
            {
                return Json(new { success = false, message = "El nombre de la marca ya existe." });
            }

            var response = await _service.EditarAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteMarca(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            _cache.Remove(CacheKey);

            return Json(new { success = true, data = response.Data });
        }
    }
}
