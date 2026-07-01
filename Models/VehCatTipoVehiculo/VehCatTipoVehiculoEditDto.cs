using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoVehiculo
{
    public class VehCatTipoVehiculoEditDto: VehCatTipoVehiculoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
