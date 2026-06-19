using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpReferenciasPersonales
{
    public class EmpReferenciasPersonalesDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre completo")]
        public string StrNombreCompleto { get; set; } = string.Empty;

        [Display(Name = "Parentezco")]
        public string StrParentezco { get; set; } = string.Empty;

        [Display(Name = "Telefono")]
        public int IntTelefono { get; set; }

        public int IdEmpEmpleado { get; set; }

        [Display(Name = "Empleado")]
        public string StrEmpEmpleado { get; set; } = string.Empty;
    }
}
