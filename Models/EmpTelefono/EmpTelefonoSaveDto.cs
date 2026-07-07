using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpTelefono
{
    public class EmpTelefonoSaveDto
    {
        [Required(ErrorMessage = "El numero fijo es obligatorio.")]
        
        [Display(Name = "Numero fijo")]
        public long LngNumeroFijo { get; set; } 

        [Display(Name = "Numero celular")]
        public long? LngNumeroCelular { get; set; }

        [Required(ErrorMessage = "El empleado es obligatorio.")]
        [Display(Name = "Empleado")]
        public int IdEmpEmpleado { get; set; }
    }
}
