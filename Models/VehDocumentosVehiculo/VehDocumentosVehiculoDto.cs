using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehDocumentosVehiculo
{
    public class VehDocumentosVehiculoDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Factura")]
        public string? StrUrlFactura { get; set; }

        public int? IdVehTarjetaCirculacion { get; set; }

        [Display(Name = "Tarjeta de circulacion")]
        public string? StrVehTarjetaCirculacion { get; set; }

        public int? IdVehTenencia { get; set; }

        [Display(Name = "Tenencia")]
        public string? StrVehTenencia { get; set; }

        public int? IdVehVerificacion { get; set; }

        [Display(Name = "Verificacion")]
        public string? StrVehVerificacion { get; set; }

        public int? IdVehSeguro { get; set; }

        [Display(Name = "Seguro")]
        public string? StrVehSeguro { get; set; }

        public int? IdVehPermisoTransporte { get; set; }

        [Display(Name = "Permiso de transporte")]
        public string? StrVehPermisoTransporte { get; set; }

        public int? IdVehRevistaVehicular { get; set; }

        [Display(Name = "Revista vehicular")]
        public string? StrVehRevistaVehicular { get; set; }

        public int? IdVehContratoArrendamiento { get; set; }

        [Display(Name = "Contrato de arrendamiento")]
        public string? StrVehContratoArrendamiento { get; set; }

        public int? IdVehPlacas { get; set; }

        [Display(Name = "Placas")]
        public string? StrVehPlacas { get; set; }
    }
}
