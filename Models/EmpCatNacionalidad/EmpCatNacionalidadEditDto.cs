using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatNacionalidad
{
    public class EmpCatNacionalidadEditDto : EmpCatNacionalidadSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
