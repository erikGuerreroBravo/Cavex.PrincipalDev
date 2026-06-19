using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpReferenciasPersonales
{
    public class EmpReferenciasPersonalesEditDto : EmpReferenciasPersonalesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
