using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpTelefono")]
    public class EmpleadoTelefono
    {
        [Key]
        public int Id { get; set; }

        public string StrNombreCompleto { get; set; } = string.Empty;

        public string StrParentezco { get; set; } = string.Empty;

        public int IntTelefono { get; set; }

        [ForeignKey("EmpEmpleado")]
        public int IdEmpEmpleado { get; set; }
    }
}
