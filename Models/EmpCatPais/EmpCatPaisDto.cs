using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatPais
{
    public class EmpCatPaisDto
    {
        public int Id { get; set; }

        [Display(Name = "Pais")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
