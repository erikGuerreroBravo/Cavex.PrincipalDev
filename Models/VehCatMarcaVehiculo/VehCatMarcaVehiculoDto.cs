using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatMarcaVehiculo
{
    public class VehCatMarcaVehiculoDto
    {
        public int Id { get; set; }

        [Display(Name = "Marca")]
        public required string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
