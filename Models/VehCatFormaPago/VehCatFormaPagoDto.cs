using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatFormaPago
{
    public class VehCatFormaPagoDto
    {
        public int Id { get; set; }

        [Display(Name = "Genero")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
