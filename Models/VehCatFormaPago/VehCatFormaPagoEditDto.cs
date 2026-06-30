using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatFormaPago
{
    public class VehCatFormaPagoEditDto: VehCatFormaPagoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
