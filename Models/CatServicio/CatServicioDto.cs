using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.CatServicio
{
    public class CatServicioDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        public int IdCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrCatStatus { get; set; } = string.Empty;
    }
}
