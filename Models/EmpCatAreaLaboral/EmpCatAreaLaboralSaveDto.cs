using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatAreaLaboral
{
    public class EmpCatAreaLaboralSaveDto
    {
        [Required(ErrorMessage = "El nombre del area es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Area Laboral")]
        public string StrValor { get; set; } = string.Empty;

       
        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcionn")]
        public string? StrDescripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int? IdCatStatus { get; set; }


    }
}
