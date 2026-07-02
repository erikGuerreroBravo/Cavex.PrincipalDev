using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehSeguro
{
    public class VehSeguroEditDto : VehSeguroSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
