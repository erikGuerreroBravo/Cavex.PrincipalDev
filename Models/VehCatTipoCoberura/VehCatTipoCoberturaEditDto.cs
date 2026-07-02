using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoCoberura
{
    public class VehCatTipoCoberturaEditDto: VehCatTipoCoberturaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
