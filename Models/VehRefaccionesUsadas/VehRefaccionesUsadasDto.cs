using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRefaccionesUsadas
{
    public class VehRefaccionesUsadasDto
    {
        public int Id { get; set; }

        public int IdVehControlServicio { get; set; }

        [Display(Name = "Servicio")]
        public string StrVehControlServicio { get; set; } = string.Empty;

        public int IdVehCatRefacciones { get; set; }

        [Display(Name = "Refaccion")]
        public string StrVehCatRefacciones { get; set; } = string.Empty;
    }
}
