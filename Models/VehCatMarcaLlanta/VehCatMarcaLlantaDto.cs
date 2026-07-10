using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatMarcaLlanta
{
    public class VehCatMarcaLlantaDto
    {
        public int Id { get; set; }

        [Display(Name = "Marca")]
        public required string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public required string StrDescripcion { get; set; }
    }
}
