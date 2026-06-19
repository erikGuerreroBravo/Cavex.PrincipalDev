using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDocumentosLaborales
{
    public class EmpDocumentosLaboralesEditDto : EmpDocumentosLaboralesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
