using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDocumentosLaborales
{
    public class EmpDocumentosLaboralesDto
    {
        public int Id { get; set; }

        [Display(Name = "Identificacion oficial")]
        public string StrUrlIdentificacionOficial { get; set; } = string.Empty;

        [Display(Name = "Comprobante de domicilio")]
        public string StrUrlComprobanteDomicilio { get; set; } = string.Empty;

        [Display(Name = "Curriculum vitae")]
        public string StrUrlCurriculumVitae { get; set; } = string.Empty;

        [Display(Name = "Contrato")]
        public string StrUrlContrato { get; set; } = string.Empty;

        [Display(Name = "Licencia")]
        public string StrUrlLicencia { get; set; } = string.Empty;

        [Display(Name = "Foto del Empleado")]
        public string StrUrlFotoEmp { get; set; } = string.Empty;
    }
}

