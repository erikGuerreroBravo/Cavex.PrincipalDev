using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatAreaLaboral
{
    public class EmpCatAreaLaboralDto
    {
        public int Id { get; set; }

        [Display(Name = "Area laboral")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
