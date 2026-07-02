using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatPosicionLlanta
{
    public class VehCatPosicionLlantaEditDto: VehCatPosicionLlantaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
