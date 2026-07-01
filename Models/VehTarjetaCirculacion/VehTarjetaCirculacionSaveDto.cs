using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTarjetaCirculacion
{
    public class VehTarjetaCirculacionSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El numero de tarjeta es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de tarjeta")]
        public string StrNumeroTarjeta { get; set; } = string.Empty;

        [Required(ErrorMessage = "La entidad federativa es obligatoria.")]
        [Display(Name = "Entidad federativa")]
        public int IdEmpCatEntidadFederativa { get; set; }

        [Required(ErrorMessage = "La fecha de expedicion es obligatoria.")]
        [Display(Name = "Fecha de expedicion")]
        public DateTime DteFechaExpedicion { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Tarjeta")]
        public string? StrUrlTarjeta { get; set; }
    }
}
