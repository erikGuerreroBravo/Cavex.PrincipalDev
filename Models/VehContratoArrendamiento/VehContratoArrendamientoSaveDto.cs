using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehContratoArrendamiento
{
    public class VehContratoArrendamientoSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El arrendatario es obligatorio.")]
        [Display(Name = "Arrendatario")]
        public int IdVehCatArrendatario { get; set; }

        [Required(ErrorMessage = "El numero de contrato es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de contrato")]
        public string StrNumeroContrato { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Periodo de pago")]
        public string? StrPeriodoPago { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Contrato de arrendamiento")]
        public string? StrUrlContratoArrendamiento { get; set; }
    }
}
