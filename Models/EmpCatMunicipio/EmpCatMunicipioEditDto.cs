using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatMunicipio
{
    public class EmpCatMunicipioEditDto : EmpCatMunicipioSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
