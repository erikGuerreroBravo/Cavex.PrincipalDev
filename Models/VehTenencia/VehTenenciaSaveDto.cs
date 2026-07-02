using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTenencia
{
    public class VehTenenciaSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El anio es obligatorio.")]
        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Required(ErrorMessage = "La fecha de pago es obligatoria.")]
        [Display(Name = "Fecha de pago")]
        public DateTime DteFechaPago { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Folio de pago")]
        public string? StrFolioPago { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehCatFormaPago { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Formato de tenencia")]
        public string? StrUrlFormatoTenencia { get; set; }
    }
}
