using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatEntidadFederativa
{
    public class EmpCatEntidadFederativaSaveDto
    {
        [Required(ErrorMessage = "El nombre de la Entidad es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Entida Federativa")]
        public string StrValor { get; set; } = string.Empty;

       
        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El pais es obligatorio.")]
        [Display(Name = "Pais")]
        public int IdEmpCatPais { get; set; }
    }
}
