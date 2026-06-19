using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpHistorialArea
{
    public class EmpHistorialAreaDto
    {
        public int Id { get; set; }

        public int IdEmpCatAreaLaboral { get; set; }

        [Display(Name = "Area laboral")]
        public string StrEmpCatAreaLaboral { get; set; } = string.Empty;

        public int IdEmpEmpleado { get; set; }

        [Display(Name = "Empleado")]
        public string StrEmpEmpleado { get; set; } = string.Empty;

        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }
    }
}
