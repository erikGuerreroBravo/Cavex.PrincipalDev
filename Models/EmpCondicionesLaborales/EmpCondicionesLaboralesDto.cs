using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCondicionesLaborales
{
    public class EmpCondicionesLaboralesDto
    {
        public int Id { get; set; }

        [Display(Name = "Cercania a la vivienda")]
        public bool BitCercaniaVivienda { get; set; }

        [Display(Name = "Disponibilidad de viaje")]
        public bool BitDisponibilidadDeViaje { get; set; }

        [Display(Name = "Sueldo mensual")]
        public decimal MnySueldoMensual { get; set; }

        [Display(Name = "Experiencia en el area")]
        public bool BitExperienciaEnArea { get; set; }

        [Display(Name = "Disponibilidad de cambio de residencia")]
        public bool BitDisponibilidadCambioResidencia { get; set; }

        [Display(Name = "Fecha de ingreso")]
        public DateTime DteFechaIngreso { get; set; }
    }
}
