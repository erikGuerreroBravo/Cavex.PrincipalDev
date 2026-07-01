using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTaller
{
    public class VehCatTallerEditDto: VehCatTallerSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
