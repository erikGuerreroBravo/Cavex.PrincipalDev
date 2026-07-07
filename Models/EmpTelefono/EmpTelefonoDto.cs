using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpTelefono
{
    public class EmpTelefonoDto
    {
        public int Id { get; set; }

        [Display(Name = "Numero fijo")]
        public string StrNumeroFijo { get; set; } = string.Empty;

        [Display(Name = "Numero celular")]
        public string? StrNumeroCelular { get; set; }

        public int IdEmpEmpleado { get; set; }

        [Display(Name = "Empleado")]
        public string StrEmpEmpleado { get; set; } = string.Empty;
    }
}
