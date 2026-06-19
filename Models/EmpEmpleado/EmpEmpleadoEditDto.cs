using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpEmpleado
{
    public class EmpEmpleadoEditDto : EmpEmpleadoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
