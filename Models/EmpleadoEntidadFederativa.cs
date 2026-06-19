using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpCatEntidadFederativa")]
    public class EmpleadoEntidadFederativa
    {
        [Key]
        public int Id { get; set; }

        public string StrValor { get; set; } = string.Empty;

        public string? StrDescripcion { get; set; }

        [ForeignKey("EmpCatPais")]
        public int IdEmpCatPais { get; set; }

    }
}
