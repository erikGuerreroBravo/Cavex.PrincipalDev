using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDireccion
{
    public class EmpDireccionEditDto : EmpDireccionSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
