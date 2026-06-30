using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatHolograma
{
    public class VehCatHologramaDto
    {
        public int Id { get; set; }

        [Display(Name = "Genero")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
