using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehPlacas
{
    public class VehPlacasEditDto : VehPlacasSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
