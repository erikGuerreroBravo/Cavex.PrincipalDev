using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatResponsableServicio
{
    public class VehCatResponsableServicioEditDto: VehCatResponsableServicioSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
