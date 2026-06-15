using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatAreaLaboral
{
    public class EmpCatAreaLaboralEditDto : EmpCatAreaLaboralSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
