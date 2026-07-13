using Cavex.Principal.Models.VehCatCapacidad;
using Cavex.Principal.Models.VehCatColor;
using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Cavex.Principal.Models.VehCatTaller;
using Cavex.Principal.Models.VehCatTipoCombustible;
using Cavex.Principal.Models.VehCatTipoVehiculo;
using Cavex.Principal.Models.Vehiculo;
using Cavex.Principal.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace Cavex.Principal.Controllers
{
    public class VehiculosController : Controller
    {
        private readonly IVehCatColorService _vehCatColorService;
        private readonly IVehCatMarcaVehiculoService _vehCatMarcaVehiculo;
        private readonly IVehCatTipoVehiculoService _vehCatTipoVehiculo;
        private readonly IVehCatCapacidadService _vehCatCapacidad;
        private readonly IVehCatTipoCombustibleService _vehCatTipoCombustible;
        public VehiculosController(IVehCatMarcaVehiculoService vehCatMarcaVehiculo, IVehCatColorService vehCatColorService, 
            IVehCatTipoVehiculoService vehCatTipoVehiculo, IVehCatCapacidadService vehCatCapacidad, IVehCatTipoCombustibleService vehCatTipoCombustible)
        {
            _vehCatMarcaVehiculo = vehCatMarcaVehiculo;
            _vehCatColorService = vehCatColorService;
            _vehCatTipoVehiculo = vehCatTipoVehiculo;
            _vehCatCapacidad = vehCatCapacidad;
            _vehCatTipoCombustible = vehCatTipoCombustible;
        }

        [HttpGet("/Vehiculos")]
        [HttpGet("/Vehiculos/Index")]
        public IActionResult Index()
        {
            return View();
        }

       

        // Pantalla frontend de infracciones; no consulta ni guarda información todavía.
        [HttpGet("/Vehiculos/Infracciones")]
        public IActionResult Infracciones()
        {
            return View();
        }

        // Pantalla frontend de cargas de combustible; no persiste datos todavía.
        [HttpGet("/Vehiculos/Gasolina")]
        public IActionResult Gasolina()
        {
            return View();
        }

        // Pantalla frontend de control de llantas; usa datos simulados hasta implementar endpoints reales.
        [HttpGet("/Vehiculos/Llantas")]
        public IActionResult Llantas()
        {
            return View();
        }

        // Pantalla frontend de daños y accidentes; no consulta ni persiste eventos todavía.
        [HttpGet("/Vehiculos/DaniosAccidentes")]
        public IActionResult DaniosAccidentes()
        {
            return View();
        }

        // Pantalla frontend de asignaciones; usa datos simulados hasta implementar los endpoints reales.
        [HttpGet("/Vehiculos/Asignaciones")]
        public IActionResult Asignaciones()
        {
            return View();
        }

        // Pantalla temporal de detalle; conserva el id opcional para la futura adaptación.
        [HttpGet("/Vehiculos/Detalle/{id:int?}")]
        public IActionResult Detalle(int? id)
        {
            ViewBag.VehiculoId = id ?? 1;
            return View();
        }

        // Pantalla de Agregar gasolineras
        [HttpGet("/Vehiculos/Gasolineras/{id:int?}")]
        public IActionResult Gasolineras(int? id)
        {
            ViewData["GasolineraId"] = id ?? 1;
            return View();
        }


        #region Insertar datos del formulario
        
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }


        [HttpPost("/Vehiculos/SaveVehiculo")]
        public IActionResult SaveVehiculo([FromBody]  VehiculoManagerSaveDto managerSaveDto) 
        {
            return Ok(new
            {
                success = true,
                message = "Vehículo guardado correctamente."
            });
        }
        #endregion

        #region consumo de servicios necesarios para la vista

        [HttpGet("/Vehiculos/Marcas")]
        public async Task<JsonResult> GetAllMarcaVehiculos(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _vehCatMarcaVehiculo.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatMarcaVehiculoDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }

        [HttpGet("/Vehiculos/Color")]
        public async Task<JsonResult> GetAllColorVehiculos(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _vehCatColorService.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatColorDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }


        /// <summary>
        /// Este metodo se encarga de consultar los diferentes tipos de vehiculos
        /// </summary>
        /// <param name="pagina">numero de pagina</param>
        /// <param name="search">busqueda de elementos en la pagina</param>
        /// <param name="cancellationToken">token de cancelacion</param>
        /// <returns>el resultado en json de la consulta especifica del tipo de vehiculo</returns>
        [HttpGet("/Vehiculos/TipoVehiculo")]
        public async Task<JsonResult> GetAllTipoVehiculo(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _vehCatTipoVehiculo.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatTipoVehiculoDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }

        /// <summary>
        /// Controlador que se encarga 
        /// </summary>
        /// <param name="pagina"></param>
        /// <param name="search"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpGet("/Vehiculos/Capacidad")]
        public async Task<JsonResult> GetAllCapacidadVehiculo(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _vehCatCapacidad.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatCapacidadDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }

        [HttpGet("/Vehiculos/Combustible")]
        public async Task<JsonResult> GetAllCombustibleVehiculo(int pagina, string? search, CancellationToken cancellationToken)
        {
            if (pagina < 1) pagina = 1;

            var response = await _vehCatTipoCombustible.ObtenerTodosAsync(pagina, 10, search, cancellationToken);
            if (!response.Success)
            {
                return Json(new { success = false, message = response.Message });
            }

            var items = response.Data?.Items?.ToList() ?? new List<VehCatTipoCombustibleDto>();
            var totalCount = response.Data?.TotalCount ?? 0;

            return Json(new { success = true, data = items, totalCount = totalCount });
        }



        #endregion



    }
}
