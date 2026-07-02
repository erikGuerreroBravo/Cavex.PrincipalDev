using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehInfracciones
{
    public class VehInfraccionesEditDto : VehInfraccionesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
