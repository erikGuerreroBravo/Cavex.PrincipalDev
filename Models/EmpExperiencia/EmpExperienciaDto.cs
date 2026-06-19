using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpExperiencia
{
    public class EmpExperienciaDto
    {
        public int Id { get; set; }

        [Display(Name = "Empresa")]
        public string StrEmpresa { get; set; } = string.Empty;

        [Display(Name = "Puesto")]
        public string StrPuesto { get; set; } = string.Empty;

        [Display(Name = "Area")]
        public string StrArea { get; set; } = string.Empty;

        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaIncio { get; set; }

        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }

        [Display(Name = "Sueldo")]
        public decimal MnySueldo { get; set; }

        [Display(Name = "Motivo de salida")]
        public string StrMotivoSalida { get; set; } = string.Empty;

        public int IdEmpEmpleado { get; set; }

        [Display(Name = "Empleado")]
        public string StrEmpEmpleado { get; set; } = string.Empty;
    }
}
