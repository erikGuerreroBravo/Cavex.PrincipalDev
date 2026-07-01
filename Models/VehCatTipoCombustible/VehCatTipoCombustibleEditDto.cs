using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoCombustible
{
    public class VehCatTipoCombustibleEditDto: VehCatTipoCombustibleSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
