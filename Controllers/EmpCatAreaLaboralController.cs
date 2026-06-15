using Cavex.Principal.Models.EmpCatAreaLaboral;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Cavex.Principal.Controllers
{
    public class EmpCatAreaLaboralController : Controller
    {
        private const int DefaultPageSize = 10;
        private readonly IEmpCatAreaLaboralService _service;

        public EmpCatAreaLaboralController(IEmpCatAreaLaboralService service)
        {
            _service = service;
        }

        public async Task<IActionResult> Index(
            int pageIndex = 1,
            int pageSize = DefaultPageSize,
            CancellationToken cancellationToken = default)
        {
            var response = await _service.ObtenerTodosAsync(pageIndex, pageSize, cancellationToken);

            if(!response.Success)
            {
                TempData["ErrorMessage"] = response.Message ?? "No fue posible consultar las areas laborales.";
            }

            return View(response.Data);
        }

        public async Task<IActionResult> Details(int id, CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerPorIdAsync(id, cancellationToken);

            if(!response.Success || response.Data is null)
            {
                TempData["ErrorMessage"] = response.Message ?? "No fue posible consultar el area laboral";
                return RedirectToAction(nameof(Index));
            }

            return View(response.Data);
        }

        public IActionResult Create()
        {
            return View(new EmpCatAreaLaboralSaveDto());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(
            EmpCatAreaLaboralSaveDto model,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var response = await _service.CrearAsync(model, cancellationToken);

            if (!response.Success)
            {
                ModelState.AddModelError(string.Empty, response.Message ?? "No fue posible crear el area laboral.");
                return View(model);
            }

            TempData["SuccessMessage"] = response.Message ?? "Area laboral creada correctamente.";

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id, CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerPorIdAsync(id, cancellationToken);

            if (!response.Success || response.Data is null)
            {
                TempData["ErrorMessage"] = response.Message ?? "No fue posible consultar el area laboral.";
                return RedirectToAction(nameof(Index));
            }

            var model = new EmpCatAreaLaboralEditDto
            {
                Id = response.Data.Id,
                StrValor = response.Data.StrValor,
                StrDescripcion = response.Data.StrDescripcion
            };

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(
            int id,
            EmpCatAreaLaboralEditDto model,
            CancellationToken cancellationToken)
        {
            if (id != model.Id)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var saveModel = new EmpCatAreaLaboralSaveDto
            {
                StrValor = model.StrValor,
                StrDescripcion = model.StrDescripcion
            };

            var response = await _service.ActualizarAsync(id, saveModel, cancellationToken);

            if (!response.Success)
            {
                ModelState.AddModelError(string.Empty, response.Message ?? "No fue posible actualizar el area laboral.");
                return View(model);
            }

            TempData["SuccessMessage"] = response.Message ?? "Area laboral actualizada correctamente.";

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            var response = await _service.ObtenerPorIdAsync(id, cancellationToken);

            if (!response.Success || response.Data is null)
            {
                TempData["ErrorMessage"] = response.Message ?? "No fue posible consultar el area laboral.";
                return RedirectToAction(nameof(Index));
            }

            return View(response.Data);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id, CancellationToken cancellationToken)
        {
            var response = await _service.EliminarAsync(id, cancellationToken);

            TempData[response.Success ? "SuccessMessage" : "ErrorMessage"] =
                response.Message ?? (response.Success
                    ? "Area laboral eliminada correctamente."
                    : "No fue posible eliminar el area laboral.");

            return RedirectToAction(nameof(Index));
        }
    }
}
