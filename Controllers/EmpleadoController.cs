using Cavex.Principal.Models.EmpEmpleado;
using Cavex.Principal.Services.Interfaces;
using Cavex.Principal.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class EmpleadoController : Controller
    {
        private readonly IEmpEmpleadoService _service;

        public EmpleadoController(IEmpEmpleadoService service)
        {
            _service = service;
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

    
