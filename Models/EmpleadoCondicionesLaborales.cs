using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpCondicionesLaborales")]
    public class EmpleadoCondicionesLaborales
    {
        [Key]
        public int Id { get; set; }

        public bool BitCercaniaVivienda { get; set; }

        public bool BitDisponibilidadDeViaje { get; set; }

        public decimal MnySueldoMensual { get; set; }

        public bool BitExperienciaEnArea { get; set; }

        public bool BitDisponibilidadCambioResidencia { get; set; }

        public DateTime DteFechaIngreso { get; set; }
    }
}
