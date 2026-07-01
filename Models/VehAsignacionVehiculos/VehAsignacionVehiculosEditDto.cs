using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehAsignacionVehiculos
{
    public class VehAsignacionVehiculosEditDto : VehAsignacionVehiculosSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
