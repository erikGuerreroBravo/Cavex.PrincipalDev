using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehDatosGenerales
{
    public class VehDatosGeneralesEditDto : VehDatosGeneralesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
