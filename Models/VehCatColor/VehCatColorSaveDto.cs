using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatColor
{
    public class VehCatColorSaveDto
    {
        [Required(ErrorMessage = "El color es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Color")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
