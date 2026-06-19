using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatTipoContratacion
{
    public class EmpCatTipoContratacionEditDto : EmpCatTipoContratacionSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
