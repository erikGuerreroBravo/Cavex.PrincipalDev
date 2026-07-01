using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTarjetaCirculacion
{
    public class VehTarjetaCirculacionDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Numero de tarjeta")]
        public string StrNumeroTarjeta { get; set; } = string.Empty;

        public int IdEmpCatEntidadFederativa { get; set; }

        [Display(Name = "Entidad federativa")]
        public string StrEmpCatEntidadFederativa { get; set; } = string.Empty;

        [Display(Name = "Fecha de expedicion")]
        public DateTime DteFechaExpedicion { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Tarjeta")]
        public string? StrUrlTarjeta { get; set; }
    }
}
