using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatMarcaLlanta
{
    public class VehCatMarcaLlantaEditDto: VehCatMarcaLlantaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
