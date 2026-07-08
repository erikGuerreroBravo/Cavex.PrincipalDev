using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatPosicionLlanta
{
    public class VehCatPosicionLlantaDto
    {
        public int Id { get; set; }

        [Display(Name = "Posicion")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
