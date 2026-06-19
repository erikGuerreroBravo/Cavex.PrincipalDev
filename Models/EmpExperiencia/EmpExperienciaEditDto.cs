using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpExperiencia
{
    public class EmpExperienciaEditDto : EmpExperienciaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
