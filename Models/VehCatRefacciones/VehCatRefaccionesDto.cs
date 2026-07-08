using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatRefacciones
{
    public class VehCatRefaccionesDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
