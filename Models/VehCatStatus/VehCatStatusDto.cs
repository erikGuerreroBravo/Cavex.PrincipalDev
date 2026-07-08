using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatStatus
{
    public class VehCatStatusDto
    {
        public int Id { get; set; }

        [Display(Name = "Status")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }
    }
}
