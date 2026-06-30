using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatArrendatario
{
    public class VehCatArrendatarioEditDto: VehCatArrendatarioSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
