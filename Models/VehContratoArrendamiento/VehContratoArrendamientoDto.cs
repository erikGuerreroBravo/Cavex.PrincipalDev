using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehContratoArrendamiento
{
    public class VehContratoArrendamientoDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        public int IdVehCatArrendatario { get; set; }

        [Display(Name = "Arrendatario")]
        public string StrVehCatArrendatario { get; set; } = string.Empty;

        [Display(Name = "Numero de contrato")]
        public string StrNumeroContrato { get; set; } = string.Empty;

        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Periodo de pago")]
        public string? StrPeriodoPago { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Contrato de arrendamiento")]
        public string? StrUrlContratoArrendamiento { get; set; }
    }
}
