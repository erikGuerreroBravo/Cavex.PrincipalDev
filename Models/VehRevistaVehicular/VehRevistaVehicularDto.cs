using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRevistaVehicular
{
    public class VehRevistaVehicularDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Folio de revista")]
        public string StrFolioRevista { get; set; } = string.Empty;

        [Display(Name = "Resultado")]
        public string StrResultado { get; set; } = string.Empty;

        [Display(Name = "Inspector")]
        public string StrInspector { get; set; } = string.Empty;

        [Display(Name = "Fecha de revista")]
        public DateTime DteFechaRevista { get; set; }

        [Display(Name = "Proxima revista")]
        public DateTime DteProximaRevista { get; set; }

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Revista vehicular")]
        public string? StrUrlRevistaVehicular { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;
    }
}
