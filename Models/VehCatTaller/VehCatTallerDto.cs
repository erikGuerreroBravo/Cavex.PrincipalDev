using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatTaller
{
    public class VehCatTallerDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre")]
        public required string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public required string StrDescripcion { get; set; }
    }
}
