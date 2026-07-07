using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatGasolineras
{
    public class VehCatGasolinerasEditDto: VehCatGasolinerasSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
