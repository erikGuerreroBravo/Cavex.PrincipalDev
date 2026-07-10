using Cavex.Principal.Models.EmpCatAreaLaboral;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Cavex.Principal.Controllers
{
    public class EmpCatAreaLaboralController : Controller
    {
        private readonly IEmpCatAreaLaboralService _service;
        private readonly IMemoryCache _cache;
        private const string CacheKey = "areas_list";

        public EmpCatAreaLaboralController(IEmpCatAreaLaboralService service, IMemoryCache cache)
        {
            _service = service;
            _cache = cache;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetAreas(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _service.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<EmpCatAreaLaboralDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }

        [HttpPost]
        public async Task<JsonResult> SaveArea([FromBody] EmpCatAreaLaboralSaveDto model, CancellationToken cancellationToken)
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
                return Json(new { success = false, message = "El nombre del área laboral ya existe." });
            }

            var response = await _service.CrearAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<JsonResult> UpdateArea([FromBody] EmpCatAreaLaboralEditDto model, CancellationToken cancellationToken)
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
                return Json(new { success = false, message = "El nombre del área laboral ya existe." });
            }

            var saveModel = new EmpCatAreaLaboralSaveDto
            {
                StrValor = model.StrValor,
                StrDescripcion = model.StrDescripcion
            };

            var response = await _service.ActualizarAsync(model.Id, saveModel, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteArea(int id, CancellationToken cancellationToken)
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
