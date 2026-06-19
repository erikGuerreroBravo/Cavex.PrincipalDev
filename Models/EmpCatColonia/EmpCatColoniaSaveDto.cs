using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatColonia
{
    public class EmpCatColoniaSaveDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Nombre")]
        public string StrValor { get; set; } = string.Empty;

        [StringLength(450, ErrorMessage = "La descripcion no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        [Required(ErrorMessage = "El municipio es obligatorio.")]
        [Display(Name = "Municipio")]
        public int IntEmpCatMunicipio { get; set; }
    }
}
