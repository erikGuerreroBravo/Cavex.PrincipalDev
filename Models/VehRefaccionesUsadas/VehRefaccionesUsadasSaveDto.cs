using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehRefaccionesUsadas
{
    public class VehRefaccionesUsadasSaveDto
    {
        [Required(ErrorMessage = "El servicio es obligatorio.")]
        [Display(Name = "Servicio")]
        public int IdVehControlServicio { get; set; }

        [Required(ErrorMessage = "La refaccion es obligatoria.")]
        [Display(Name = "Refaccion")]
        public int IdVehCatRefacciones { get; set; }
    }
}
