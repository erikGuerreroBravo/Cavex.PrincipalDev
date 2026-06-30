using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatAseguradora
{
    public class VehCatAseguradoraEditDto: VehCatAseguradoraSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
