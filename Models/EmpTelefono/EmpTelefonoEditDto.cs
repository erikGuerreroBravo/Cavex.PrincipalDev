using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpTelefono
{
    public class EmpTelefonoEditDto : EmpTelefonoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
