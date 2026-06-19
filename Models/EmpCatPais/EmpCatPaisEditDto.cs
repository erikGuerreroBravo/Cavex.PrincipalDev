using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatPais
{
    public class EmpCatPaisEditDto : EmpCatPaisSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
