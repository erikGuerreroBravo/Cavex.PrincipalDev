using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTenencia
{
    public class VehTenenciaDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Display(Name = "Fecha de pago")]
        public DateTime DteFechaPago { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Display(Name = "Folio de pago")]
        public string? StrFolioPago { get; set; }

        public int IdVehCatFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehCatFormaPago { get; set; } = string.Empty;

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Formato de tenencia")]
        public string? StrUrlFormatoTenencia { get; set; }
    }
}
