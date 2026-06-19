using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpHistorialArea
{
    public class EmpHistorialAreaEditDto : EmpHistorialAreaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
