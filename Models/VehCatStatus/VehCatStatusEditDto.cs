using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatStatus
{
    public class VehCatStatusEditDto: VehCatStatusSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
