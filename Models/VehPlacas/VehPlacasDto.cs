using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehPlacas
{
    public class VehPlacasDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Numero de placa")]
        public string StrNumPlaca { get; set; } = string.Empty;

        public int IdEmpCatEntidadFederativa { get; set; }

        [Display(Name = "Entidad federativa")]
        public string StrEmpCatEntidadFederativa { get; set; } = string.Empty;

        [Display(Name = "Fecha de asignacion")]
        public DateTime DteFechaAsignacion { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehCatFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehCatFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Placas")]
        public string? StrUrlPlacas { get; set; }
    }
}
