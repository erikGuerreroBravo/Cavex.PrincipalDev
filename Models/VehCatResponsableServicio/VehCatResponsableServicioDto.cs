using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatResponsableServicio
{
    public class VehCatResponsableServicioDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre Completo")]
        public string StrValor { get; set; }

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;
    }
}
