using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehSeguro
{
    public class VehSeguroDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        public int IdVehCatAseguradora { get; set; }

        [Display(Name = "Aseguradora")]
        public string StrVehCatAseguradora { get; set; } = string.Empty;

        [Display(Name = "Numero de poliza")]
        public string StrNumeroPoliza { get; set; } = string.Empty;

        [Display(Name = "Monto de cobertura")]
        public decimal MnyMontoCoberura { get; set; }

        public int IdVehCatTipoCobertura { get; set; }

        [Display(Name = "Tipo de cobertura")]
        public string StrVehCatTipoCobertura { get; set; } = string.Empty;

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;

        [Display(Name = "Poliza de seguro")]
        public string? StrUrlPolizaSeguro { get; set; }
    }
}
