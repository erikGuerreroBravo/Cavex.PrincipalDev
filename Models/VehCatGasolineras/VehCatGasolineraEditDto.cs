using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatGasolineras
{
    public class VehCatGasolineraEditDto: VehCatGasolineraSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
