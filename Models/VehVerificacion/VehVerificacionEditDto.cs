using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehVerificacion
{
    public class VehVerificacionEditDto : VehVerificacionSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
