using System.ComponentModel.DataAnnotations;
using Cavex.Principal.Models.VehDatosGenerales;
using Cavex.Principal.Models.VehControlServicio;
using Cavex.Principal.Models.VehSeguro;
using Cavex.Principal.Models.VehInfracciones;
using Cavex.Principal.Models.VehAsignacionVehiculos;
using Cavex.Principal.Models.VehDocumentosVehiculo;

namespace Cavex.Principal.Models.VehManager
{
    public class VehiculoManagerDto
    {
        

        public int Id { get; set; }

        [Display(Name = "Marca")]
        public string StrVehCatMarcaVehiculo { get; set; } = string.Empty;

        [Display(Name = "Modelo")]
        public string StrModelo { get; set; } = string.Empty;

        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Display(Name = "Version")]
        public string? StrVersion { get; set; }

        [Display(Name = "Placa")]
        public string StrPlaca { get; set; } = string.Empty;

        [Display(Name = "Color")]
        public string StrVehCatColor { get; set; } = string.Empty;

        [Display(Name = "Tipo de vehiculo")]
        public string StrVehCatTipoVehiculo { get; set; } = string.Empty;


        [Display(Name = "Kilometraje actual")]
        public decimal DecKilometrajeActual { get; set; }

        [Display(Name = "Fecha de registro")]
        public DateOnly DteFechaRegistro { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Foto")]
        public string? StrUrlFoto { get; set; }

        
        [Display(Name = "Proximo servicio")]
        public VehControlServicioDto? ProximoServicio { get; set; }

        

        [Display(Name = "Ultimo servicio")]
        public VehControlServicioDto? UltimoServicio { get; set; }

        

        [Display(Name = "Promedio km por anio")]
        public decimal? DecPromedioKmAnio { get; set; }

        

        [Display(Name = "Mantenimiento reciente")]
        public List<VehControlServicioDto> MantenimientoReciente { get; set; } = new();

     

        [Display(Name = "Seguro vigente")]
        public VehSeguroDto? SeguroVigente { get; set; }

        

        [Display(Name = "Total de infracciones activas")]
        public int IntTotalInfraccionesActivas { get; set; }

        [Display(Name = "Total adeudado infracciones")]
        public decimal MnyTotalAdeudadoInfracciones { get; set; }

        [Display(Name = "Infracciones")]
        public List<VehInfraccionesDto> Infracciones { get; set; } = new();

        

        [Display(Name = "Historial de kilometraje")]
        public List<VehAsignacionVehiculosDto> HistorialKilometraje { get; set; } = new();

       

        [Display(Name = "Documentos del vehiculo")]
        public VehiculoDocumentosResumenDto? Documentos { get; set; }
    }


    public class VehiculoDocumentosResumenDto
    {
        public int? IdVehTarjetaCirculacion { get; set; }

        [Display(Name = "Tarjeta de circulacion - Url")]
        public string? StrUrlTarjetaCirculacion { get; set; }

        [Display(Name = "Tarjeta de circulacion - Fecha")]
        public DateOnly? DteFechaTarjetaCirculacion { get; set; }

        [Display(Name = "Factura - Url")]
        public string? StrUrlFactura { get; set; }

        [Display(Name = "Factura - Fecha")]
        public DateOnly? DteFechaFactura { get; set; }

        public int? IdVehSeguro { get; set; }

        [Display(Name = "Poliza de seguro - Url")]
        public string? StrUrlPolizaSeguro { get; set; }

        [Display(Name = "Poliza de seguro - Fecha")]
        public DateOnly? DteFechaPolizaSeguro { get; set; }

        public int? IdVehTenencia { get; set; }

        [Display(Name = "Tenencia ")]
        public string? StrUrlFormatoTenencia { get; set; }

        [Display(Name = "Tenencia - Fecha")]
        public DateOnly? DteFechaTenencia { get; set; }

        public int? IdVehPermisoTransporte { get; set; }

        [Display(Name = "Permiso de transporte ")]
        public string? StrUrlPermisoTransporte { get; set; }

        [Display(Name = "Permiso de transporte - Fecha")]
        public DateOnly? DteFechaPermisoTransporte { get; set; }

        public int? IdVehRevistaVehicular { get; set; }

        [Display(Name = "Revista vehicular ")]
        public string? StrUrlRevistaVehicular { get; set; }

        [Display(Name = "Revista vehicular - Fecha")]
        public DateOnly? DteFechaRevistaVehicular { get; set; }

        public int? IdVehContratoArrendamiento { get; set; }

        [Display(Name = "Contrato de arrendamiento - Url")]
        public string? StrUrlContratoArrendamiento { get; set; }

        [Display(Name = "Contrato de arrendamiento - Fecha")]
        public DateOnly? DteFechaContratoArrendamiento { get; set; }

        public int? IdVehPlacas { get; set; }

        [Display(Name = "Placas - Url")]
        public string? StrUrlPlacas { get; set; }

        [Display(Name = "Placas - Fecha")]
        public DateOnly? DteFechaPlacas { get; set; }
    }
}
