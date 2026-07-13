using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoVehiculo
{
    public class VehCatTipoVehiculoDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Vehiculo")]
        public string? StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
