using Cavex.Principal.Models.EmpEmpleado;
using Cavex.Principal.Services.Interfaces;
using Cavex.Principal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Cavex.Principal.Controllers
{
    public class EmpleadoController : Controller
    {
        private readonly IEmpEmpleadoService _service;
        private readonly Cavex.Principal.ApiClients.EmpCatColonia.IEmpCatColoniaApi _coloniaApi;
        private readonly Cavex.Principal.ApiClients.ICavexGeneralCatalogApi _catalogApi;
        private readonly ICatStatusService _statusService;
        private readonly IMemoryCache _cache;

        public EmpleadoController(
            IEmpEmpleadoService service,
            Cavex.Principal.ApiClients.EmpCatColonia.IEmpCatColoniaApi coloniaApi,
            Cavex.Principal.ApiClients.ICavexGeneralCatalogApi catalogApi,
            ICatStatusService statusService,
            IMemoryCache cache)
        {
            _service = service;
            _coloniaApi = coloniaApi;
            _catalogApi = catalogApi;
            _statusService = statusService;
            _cache = cache;
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
        public IActionResult Details(int id)
        {
            ViewBag.EmpleadoId = id;
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new CreateViewModel());
        }

        [HttpGet]
        public async Task<IActionResult> GetEmpleados(int pagina, string? search, string? status, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;
            int? statusVal = null;
            if (status == "activos") statusVal = 1;
            else if (status == "baja") statusVal = 2;

            var countsCacheKey = $"empleados_counts_{search}";
            if (!_cache.TryGetValue(countsCacheKey, out Dictionary<string, int>? statusCounts))
            {
                var allCountResponse = await _service.ObtenerTodosAsync(1, 1, search, null, cancellationToken);
                int totalAllCount = allCountResponse.Success ? (allCountResponse.Data?.TotalCount ?? 0) : 0;

                var activeCountResponse = await _service.ObtenerTodosAsync(1, 1, search, 1, cancellationToken);
                int activeCount = activeCountResponse.Success ? (activeCountResponse.Data?.TotalCount ?? 0) : 0;

                var inactiveCountResponse = await _service.ObtenerTodosAsync(1, 1, search, 2, cancellationToken);
                int inactiveCount = inactiveCountResponse.Success ? (inactiveCountResponse.Data?.TotalCount ?? 0) : 0;

                statusCounts = new Dictionary<string, int>
                {
                    { "total", totalAllCount },
                    { "active", activeCount },
                    { "inactive", inactiveCount }
                };

                _cache.Set(countsCacheKey, statusCounts, TimeSpan.FromSeconds(10));
            }

            int totalAllCountVal = statusCounts["total"];
            int activeCountVal = statusCounts["active"];
            int inactiveCountVal = statusCounts["inactive"];

            var response = await _service.ObtenerTodosAsync(pagina, 10, search, statusVal, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }
            return Json(new { 
                success = true, 
                data = response.Data?.Items, 
                totalCount = response.Data?.TotalCount ?? 0,
                pageIndex = pagina,
                pageSize = 10,
                totalAllCount = totalAllCountVal,
                activeCount = activeCountVal,
                inactiveCount = inactiveCountVal
            });
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

        [HttpPost]
        public async Task<IActionResult> DeactivateEmpleado(int id, CancellationToken cancellationToken)
        {
            var responseGet = await _service.ObtenerPorIdAsync(id, cancellationToken);
            if (!responseGet.Success || responseGet.Data == null)
            {
                return Json(new { success = false, message = responseGet.Message ?? "Empleado no encontrado." });
            }

            var emp = responseGet.Data;

            var saveModel = new EmpEmpleadoSaveDto
            {
                StrNombre = emp.StrNombre,
                StrApellidoPaterno = emp.StrApellidoPaterno,
                StrApellidoMaterno = emp.StrApellidoMaterno,
                DteFechaNacimiento = emp.DteFechaNacimiento,
                StrRfc = emp.StrRfc,
                StrCurp = emp.StrCurp,
                IntEdad = emp.IntEdad,
                StrCorreoElectronico = emp.StrCorreoElectronico,
                IntNss = emp.IntNss,
                IdEmpCatGenero = emp.IdEmpCatGenero,
                IdEmpCatEstadoCivil = emp.IdEmpCatEstadoCivil,
                IdEmpCatNacionalidad = emp.IdEmpCatNacionalidad,
                IdEmpCatTipoContratacion = emp.IdEmpCatTipoContratacion,
                IdCatStatus = emp.IdCatStatus == 1 ? 2 : 1,

                Direccion = new EmpDireccionSaveDto
                {
                    IdEmpCatColonia = emp.EmpDireccion?.IdEmpCatColonia ?? 1,
                    IntNumExterior = emp.EmpDireccion?.IntNumExterior,
                    IntNumInterior = emp.EmpDireccion?.IntNumInterior
                },

                DatosAcademicos = new EmpDatosAcademicosSaveDto
                {
                    StrNivelEstudios = string.IsNullOrEmpty(emp.EmpDatosAcademicos?.StrNivelEstudios) ? "N/D" : emp.EmpDatosAcademicos.StrNivelEstudios,
                    StrInstitucion = string.IsNullOrEmpty(emp.EmpDatosAcademicos?.StrInstitucion) ? "N/D" : emp.EmpDatosAcademicos.StrInstitucion,
                    StrCarrera = emp.EmpDatosAcademicos?.StrCarrera,
                    StrEstatus = string.IsNullOrEmpty(emp.EmpDatosAcademicos?.StrEstatus) ? "N/D" : emp.EmpDatosAcademicos.StrEstatus,
                    DteFechaInicio = emp.EmpDatosAcademicos != null ? emp.EmpDatosAcademicos.DteFechaInicio : DateOnly.FromDateTime(DateTime.Today),
                    DteFechaFin = emp.EmpDatosAcademicos != null ? emp.EmpDatosAcademicos.DteFechaFin : DateOnly.FromDateTime(DateTime.Today)
                },

                DocumentosLaborales = new EmpDocumentosLaboralesSaveDto
                {
                    StrUrlIdentificacionOficial = string.IsNullOrEmpty(emp.EmpDocumentosLaborales?.StrUrlIdentificacionOficial) ? "N/D" : emp.EmpDocumentosLaborales.StrUrlIdentificacionOficial,
                    StrUrlComprobanteDomicilio = string.IsNullOrEmpty(emp.EmpDocumentosLaborales?.StrUrlComprobanteDomicilio) ? "N/D" : emp.EmpDocumentosLaborales.StrUrlComprobanteDomicilio,
                    StrUrlCurriculumVitae = string.IsNullOrEmpty(emp.EmpDocumentosLaborales?.StrUrlCurriculumVitae) ? "N/D" : emp.EmpDocumentosLaborales.StrUrlCurriculumVitae,
                    StrUrlContrato = string.IsNullOrEmpty(emp.EmpDocumentosLaborales?.StrUrlContrato) ? "N/D" : emp.EmpDocumentosLaborales.StrUrlContrato,
                    StrUrlLicencia = string.IsNullOrEmpty(emp.EmpDocumentosLaborales?.StrUrlLicencia) ? "N/D" : emp.EmpDocumentosLaborales.StrUrlLicencia,
                    StrUrlFotoEmp = emp.EmpDocumentosLaborales?.StrUrlFotoEmp ?? string.Empty
                },

                CondicionesLaborales = new EmpCondicionesLaboralesSaveDto
                {
                    BitCercaniaVivienda = emp.EmpCondicionesLaborales?.BitCercaniaVivienda ?? false,
                    BitDisponibilidadDeViaje = emp.EmpCondicionesLaborales?.BitDisponibilidadDeViaje ?? false,
                    MnySueldoMensual = emp.EmpCondicionesLaborales?.MnySueldoMensual ?? 0m,
                    BitExperienciaEnArea = emp.EmpCondicionesLaborales?.BitExperienciaEnArea ?? false,
                    BitDisponibilidadCambioResidencia = emp.EmpCondicionesLaborales?.BitDisponibilidadCambioResidencia ?? false,
                    DteFechaIngreso = emp.EmpCondicionesLaborales != null ? DateOnly.FromDateTime(emp.EmpCondicionesLaborales.DteFechaIngreso) : DateOnly.FromDateTime(DateTime.Today)
                },

                Referencias = emp.EmpReferenciasPersonales?.Select(rf => new EmpReferenciaSaveDto
                {
                    StrNombreCompleto = rf.StrNombreCompleto,
                    StrParentezco = rf.StrParentezco,
                    IntTelefono = rf.IntTelefono
                }).ToList() ?? new List<EmpReferenciaSaveDto>(),

                ExperienciaLaboral = emp.EmpExperiencias?.Select(exp => new EmpExperienciaLaboralSaveDto
                {
                    StrEmpresa = exp.StrEmpresa,
                    StrPuesto = exp.StrPuesto,
                    StrArea = exp.StrArea,
                    DteFechaIncio = DateOnly.FromDateTime(exp.DteFechaIncio),
                    DteFechaFin = DateOnly.FromDateTime(exp.DteFechaFin),
                    MnySueldo = exp.MnySueldo,
                    StrMotivoSalida = exp.StrMotivoSalida
                }).ToList() ?? new List<EmpExperienciaLaboralSaveDto>(),

                IdEmpCatAreaLaboral = emp.EmpHistorialAreas?.OrderByDescending(x => x.Id).FirstOrDefault()?.IdEmpCatAreaLaboral ?? 1,

                Telefonos = emp.EmpTelefonos?.Select(t => new Cavex.Principal.Models.EmpTelefono.EmpTelefonoSaveDto
                {
                    StrNumeroFijo = t.StrNumeroFijo,
                    StrNumeroCelular = t.StrNumeroCelular,
                    IdEmpEmpleado = id
                }).ToList() ?? new List<Cavex.Principal.Models.EmpTelefono.EmpTelefonoSaveDto>()
            };

            var responseUpdate = await _service.ActualizarAsync(id, saveModel, cancellationToken);
            if (!responseUpdate.Success)
            {
                return Json(new { success = false, message = responseUpdate.Message ?? "No fue posible actualizar el estado del empleado." });
            }

            return Json(new { success = true, message = saveModel.IdCatStatus == 2 ? "Empleado dado de baja exitosamente." : "Empleado activado exitosamente." });
        }
    }
}

    
