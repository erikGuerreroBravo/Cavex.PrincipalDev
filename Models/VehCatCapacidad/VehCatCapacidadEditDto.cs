using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatCapacidad
{
    public class VehCatCapacidadEditDto: VehCatCapacidadSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
