using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatColor
{
    public class VehCatColorEditDto: VehCatColorSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
