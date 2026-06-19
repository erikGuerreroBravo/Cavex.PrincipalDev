using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatTipoContratacion
{
    public class EmpCatTipoContratacionSaveDto
    {
        [Required(ErrorMessage = "El nombre del tipo de contratacion es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Tipo de Contratacion")]
        public string StrValor { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripcion es obligatoria.")]
        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
