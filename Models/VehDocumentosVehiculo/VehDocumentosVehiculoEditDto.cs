using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehDocumentosVehiculo
{
    public class VehDocumentosVehiculoEditDto : VehDocumentosVehiculoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
