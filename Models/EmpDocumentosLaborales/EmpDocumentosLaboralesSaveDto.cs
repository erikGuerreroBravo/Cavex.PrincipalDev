using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDocumentosLaborales
{
    public class EmpDocumentosLaboralesSaveDto
    {
        [Required(ErrorMessage = "La identificacion oficial es obligatoria.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Identificacion oficial")]
        public string StrUrlIdentificacionOficial { get; set; } = string.Empty;

        [Required(ErrorMessage = "El comprobante de domicilio es obligatorio.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de domicilio")]
        public string StrUrlComprobanteDomicilio { get; set; } = string.Empty;

        [Required(ErrorMessage = "El curriculum vitae es obligatorio.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Curriculum vitae")]
        public string StrUrlCurriculumVitae { get; set; } = string.Empty;

        [Required(ErrorMessage = "El contrato es obligatorio.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Contrato")]
        public string StrUrlContrato { get; set; } = string.Empty;

        [Required(ErrorMessage = "La licencia es obligatoria.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Licencia")]
        public string StrUrlLicencia { get; set; } = string.Empty;
        
        [Required(ErrorMessage = "La foto es obligatoria.")]
        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Foto Empleado")]
        public string StrUrlFotoEmp{ get; set; } = string.Empty;
    }
}
