using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpEmpleado")]
    public class EmpleadoAreaLaboral
    {
        [Key]
        public int Id { get; set; }
        public string strValor { get; set; }
        public string strDescripcion { get; set; }
    }
}
