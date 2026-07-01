using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatRefacciones
{
    public class VehCatRefaccionesEditDto: VehCatRefaccionesSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
