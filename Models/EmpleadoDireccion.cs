using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpDireccion")]
    public class EmpleadoDireccion
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("EmpCatColonia")]
        public int IdEmpCatColonia { get; set; }

        public int? IntNumExterior { get; set; }

        public int? IntNumInterior { get; set; }
    }
}
