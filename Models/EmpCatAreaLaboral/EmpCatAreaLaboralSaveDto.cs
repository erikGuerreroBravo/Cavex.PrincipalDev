using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatAreaLaboral
{
    public class EmpCatAreaLaboralSaveDto
    {
        [Required(ErrorMessage = "El valor es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Area laboral")]
        public string StrValor { get; set; } = string.Empty;

        [StringLength(250, ErrorMessage = "La descripcion no puede superar los 250 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
