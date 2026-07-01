using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatTransmision
{
    public class VehCatTransmisionDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Transmision")]
        public string StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
