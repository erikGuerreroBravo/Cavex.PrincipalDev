using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoCombustible
{
    public class VehCatTipoCombustibleDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Combustible")]
        public string? StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
