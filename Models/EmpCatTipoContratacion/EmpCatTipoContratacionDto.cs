using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatTipoContratacion
{
    public class EmpCatTipoContratacionDto
    {
        public int Id { get; set; }

        [Display(Name = "Tipo de Contratacion")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
