using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRefaccionesUsadas
{
    public class VehRefaccionesUsadasEditDto : VehRefaccionesUsadasSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
