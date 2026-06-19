using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatPais
{
    public class EmpCatPaisSaveDto
    {
        [Required(ErrorMessage = "El nombre del pais es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Pais")]
        public string StrValor { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripcion es obligatoria.")]
        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
