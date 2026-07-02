using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehSeguro
{
    public class VehSeguroSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "La aseguradora es obligatoria.")]
        [Display(Name = "Aseguradora")]
        public int IdVehCatAseguradora { get; set; }

        [Required(ErrorMessage = "El numero de poliza es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de poliza")]
        public string StrNumeroPoliza { get; set; } = string.Empty;

        [Required(ErrorMessage = "El monto de cobertura es obligatorio.")]
        [Display(Name = "Monto de cobertura")]
        public decimal MnyMontoCoberura { get; set; }

        [Required(ErrorMessage = "El tipo de cobertura es obligatorio.")]
        [Display(Name = "Tipo de cobertura")]
        public int IdVehCatTipoCobertura { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Poliza de seguro")]
        public string? StrUrlPolizaSeguro { get; set; }
    }
}
