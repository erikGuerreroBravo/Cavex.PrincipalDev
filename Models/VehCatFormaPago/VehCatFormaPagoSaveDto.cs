using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatFormaPago
{
    public class VehCatFormaPagoSaveDto
    {
        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Forma de Pago")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
