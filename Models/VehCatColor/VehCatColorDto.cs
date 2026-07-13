using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatColor
{
    public class VehCatColorDto
    {
        public int Id { get; set; }

        [Display(Name = "Color")]
        public string? StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
