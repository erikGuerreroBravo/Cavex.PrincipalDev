using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTransmision
{
    public class VehCatTransmisionEditDto:VehCatTransmisionSaveDto
    {

        [Required]
        public int Id { get; set; }
    }
}
