using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehControlLlanta
{
    public class VehControlLlantaEditDto : VehControlLlantaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
