using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoServicio
{
    public class VehCatTipoServicioEditDto: VehCatTipoServicioSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
