using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehVerificacion
{
    public class VehVerificacionDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Folio de verificacion")]
        public string StrFolioVerificacion { get; set; } = string.Empty;

        public int IdVehCatHolograma { get; set; }

        [Display(Name = "Holograma")]
        public string StrVehCatHolograma { get; set; } = string.Empty;

        [Display(Name = "Centro de verificacion")]
        public string StrCentroVerificacion { get; set; } = string.Empty;

        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Display(Name = "Semestre")]
        public string StrSemestre { get; set; } = string.Empty;

        [Display(Name = "Fecha de verificacion")]
        public DateTime DteFechaVerificacion { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;
    }
}
