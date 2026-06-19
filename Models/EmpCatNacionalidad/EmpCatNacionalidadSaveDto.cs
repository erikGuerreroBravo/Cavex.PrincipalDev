using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatNacionalidad
{
    public class EmpCatNacionalidadSaveDto
    {
        [Required(ErrorMessage = "El nombre de la nacionalidad es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Nacionalidad")]
        public string StrValor { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripcion es obligatoria.")]
        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
