using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatEntidadFederativa
{
    public class EmpCatEntidadFederativaDto
    {
        public int Id { get; set; }
        
        [Display(Name = "Nombre")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        public int IdEmpCatPais { get; set; }

        [Display(Name = "Pais")]
        public string StrEmpCatPais { get; set; } = string.Empty;

    }
}
