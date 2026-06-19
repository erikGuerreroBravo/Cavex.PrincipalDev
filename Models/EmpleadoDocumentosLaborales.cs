using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpDocumentosLaborales")]
    public class EmpleadoDocumentosLaborales
    {
        [Key]
        public int Id { get; set; }

        public string StrUrlIdentificacionOficial { get; set; } = string.Empty;

        public string StrUrlComprobanteDomicilio { get; set; } = string.Empty;

        public string StrUrlCurriculumVitae { get; set; } = string.Empty;

        public string StrUrlContrato { get; set; } = string.Empty;

        public string StrUrlLicencia { get; set; } = string.Empty;
    }
}
