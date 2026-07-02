using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRevistaVehicular
{
    public class VehRevistaVehicularSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El folio de revista es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Folio de revista")]
        public string StrFolioRevista { get; set; } = string.Empty;

        [Required(ErrorMessage = "El resultado es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Resultado")]
        public string StrResultado { get; set; } = string.Empty;

        [Required(ErrorMessage = "El inspector es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Inspector")]
        public string StrInspector { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de revista es obligatoria.")]
        [Display(Name = "Fecha de revista")]
        public DateTime DteFechaRevista { get; set; }

        [Required(ErrorMessage = "La proxima revista es obligatoria.")]
        [Display(Name = "Proxima revista")]
        public DateTime DteProximaRevista { get; set; }

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
        [Display(Name = "Revista vehicular")]
        public string? StrUrlRevistaVehicular { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }
    }
}
