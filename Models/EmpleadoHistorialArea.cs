using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpHistorialArea")]
    public class EmpleadoHistorialArea
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("EmpCatAreaLaboral")]
        public int IdEmpCatAreaLaboral { get; set; }

        [ForeignKey("EmpEmpleado")]
        public int IdEmpEmpleado { get; set; }

        public DateTime DteFechaInicio { get; set; }

        public DateTime DteFechaFin { get; set; }
    }
}
