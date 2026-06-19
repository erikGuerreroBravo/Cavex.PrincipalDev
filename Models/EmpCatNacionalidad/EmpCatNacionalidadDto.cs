using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatNacionalidad
{
    public class EmpCatNacionalidadDto
    {
        public int Id { get; set; }

        [Display(Name = "Nacionalidad")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
