using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoCoberura
{
    public class VehCatTipoCoberturaDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Cobertura")]
        public string StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
