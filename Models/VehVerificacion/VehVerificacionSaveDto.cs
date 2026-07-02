using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehVerificacion
{
    public class VehVerificacionSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El folio de verificacion es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Folio de verificacion")]
        public string StrFolioVerificacion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El holograma es obligatorio.")]
        [Display(Name = "Holograma")]
        public int IdVehCatHolograma { get; set; }

        [Required(ErrorMessage = "El centro de verificacion es obligatorio.")]
        [StringLength(300, ErrorMessage = "El valor no puede superar los 300 caracteres.")]
        [Display(Name = "Centro de verificacion")]
        public string StrCentroVerificacion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El anio es obligatorio.")]
        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Required(ErrorMessage = "El semestre es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Semestre")]
        public string StrSemestre { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de verificacion es obligatoria.")]
        [Display(Name = "Fecha de verificacion")]
        public DateTime DteFechaVerificacion { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }
    }
}
