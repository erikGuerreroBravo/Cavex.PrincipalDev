using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatHolograma
{
    public class VehCatHologramaEditDto: VehCatHologramaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
