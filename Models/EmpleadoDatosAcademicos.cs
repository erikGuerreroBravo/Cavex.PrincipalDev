using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpDatosAcademicos")]
    public class EmpleadoDatosAcademicos
    {
        [Key]
        public int Id { get; set; }

        public string StrNivelEstudios { get; set; } = string.Empty;

        public string StrInstitucion { get; set; } = string.Empty;

        public string? StrCarrera { get; set; }

        public string StrEstatus { get; set; } = string.Empty;

        public DateTime DteFechaInicio { get; set; }

        public DateTime DteFechaFin { get; set; }
    }
}
