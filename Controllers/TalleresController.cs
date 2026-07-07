using Cavex.Principal.Models.VehCatTaller;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class TalleresController : Controller
    {
        private readonly IVehCatTallerService _service;
        private static (List<VehCatTallerDto> Items, DateTime Expiration)? _cache;
        private static readonly object _lock = new();

        public TalleresController(IVehCatTallerService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetTalleres(CancellationToken cancellationToken)
        {
            lock (_lock)
            {
                if (_cache != null && _cache.Value.Expiration > DateTime.UtcNow)
                {
                    return Json(new { success = true, data = _cache.Value.Items });
                }
            }

            var response = await _service.ObtenerTodosAsync(1, 9999, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatTallerDto>();
            lock (_lock)
            {
                _cache = (items, DateTime.UtcNow.AddSeconds(15));
            }

            return Json(new { success = true, data = items });
        }

        [HttpPost]
        public async Task<IActionResult> SaveTaller([FromBody] VehCatTallerSaveDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            // Check duplicate
            var existing = await _service.ObtenerTodosAsync(1, 9999, cancellationToken);
            if (existing.Success && existing.Data?.Items != null)
            {
                var exists = existing.Data.Items.Any(x => 
                    x.StrValor.Trim().Equals(model.StrValor.Trim(), StringComparison.OrdinalIgnoreCase));
                if (exists)
                {
                    return Json(new { success = false, message = "El nombre del taller ya existe." });
                }
            }

            var response = await _service.CrearAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_lock)
            {
                _cache = null;
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaller([FromBody] VehCatTallerEditDto model, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                return Json(new { success = false, message = string.Join(" ", errors) });
            }

            // Check duplicate
            var existing = await _service.ObtenerTodosAsync(1, 9999, cancellationToken);
            if (existing.Success && existing.Data?.Items != null)
            {
                var exists = existing.Data.Items.Any(x => 
                    x.StrValor.Trim().Equals(model.StrValor.Trim(), StringComparison.OrdinalIgnoreCase) && 
                    x.Id != model.Id);
                if (exists)
                {
                    return Json(new { success = false, message = "El nombre del taller ya existe." });
                }
            }

            var response = await _service.EditarAsync(model, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_lock)
            {
                _cache = null;
            }

            return Json(new { success = true, data = response.Data });
        }

        [HttpPost]
        public async Task<IActionResult> DeleteTaller(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            lock (_lock)
            {
                _cache = null;
            }

            return Json(new { success = true, data = response.Data });
        }
    }
}
