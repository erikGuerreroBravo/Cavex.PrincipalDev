using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCondicionesLaborales
{
    public class EmpCondicionesLaboralesEditDto : EmpCondicionesLaboralesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
