using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpExperienciaLaboral")]
    public class EmpleadoExperienciaLaboral
    {
        [Key]
        public int Id { get; set; }

        public string StrEmpresa { get; set; } = string.Empty;

        public string StrPuesto { get; set; } = string.Empty;

        public string StrArea { get; set; } = string.Empty;

        public DateTime DteFechaIncio { get; set; }

        public DateTime DteFechaFin { get; set; }

        public decimal MnySueldo { get; set; }

        public string StrMotivoSalida { get; set; } = string.Empty;

        [ForeignKey("EmpEmpleado")]
        public int IdEmpEmpleado { get; set; }
    }
}
