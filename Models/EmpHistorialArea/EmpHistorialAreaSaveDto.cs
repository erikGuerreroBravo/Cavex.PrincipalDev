using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpHistorialArea
{
    public class EmpHistorialAreaSaveDto
    {
        [Required(ErrorMessage = "El area laboral es obligatoria.")]
        [Display(Name = "Area laboral")]
        public int IdEmpCatAreaLaboral { get; set; }

        [Required(ErrorMessage = "El empleado es obligatorio.")]
        [Display(Name = "Empleado")]
        public int IdEmpEmpleado { get; set; }

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }
    }
}
