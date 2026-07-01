using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehDaniosAccidentes
{
    public class VehDaniosAccidentesEditDto : VehDaniosAccidentesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
