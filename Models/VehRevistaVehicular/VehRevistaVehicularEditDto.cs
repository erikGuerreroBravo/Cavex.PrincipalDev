using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRevistaVehicular
{
    public class VehRevistaVehicularEditDto : VehRevistaVehicularSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
