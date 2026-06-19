using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpCatMunicipio")]
    public class EmpleadoMunicipio
    {
        [Key]
        public int Id { get; set; }

        public string StrValor { get; set; } = string.Empty;

        public string? StrDescripcion { get; set; }

        [ForeignKey("EmpCatEntidadFederativa")]
        public int IdEmpCatEntidadFederativa { get; set; }
    }
}
