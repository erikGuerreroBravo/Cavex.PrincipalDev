using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatMarcaVehiculo
{
    public class VehCatMarcaVehiculoEditDto: VehCatMarcaVehiculoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
