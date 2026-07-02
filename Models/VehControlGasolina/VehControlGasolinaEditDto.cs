using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehControlGasolina
{
    public class VehControlGasolinaEditDto : VehControlGasolinaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
