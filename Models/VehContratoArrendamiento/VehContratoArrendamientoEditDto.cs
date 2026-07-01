using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehContratoArrendamiento
{
    public class VehContratoArrendamientoEditDto : VehContratoArrendamientoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
