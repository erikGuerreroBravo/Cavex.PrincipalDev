using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehPermisoTransporte
{
    public class VehPermisoTransporteDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        [Display(Name = "Numero de permiso")]
        public string StrNumeroPermiso { get; set; } = string.Empty;

        public int IdVehCatTipoPermiso { get; set; }

        [Display(Name = "Tipo de permiso")]
        public string StrVehCatTipoPermiso { get; set; } = string.Empty;

        [Display(Name = "Autoridad")]
        public string StrAutoridad { get; set; } = string.Empty;

        [Display(Name = "Fecha de expedicion")]
        public DateTime DteFechaExpedicion { get; set; }

        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Display(Name = "Permiso de transporte")]
        public string? StrUrlPermisoTransporte { get; set; }

        public int IdVehCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrVehCatStatus { get; set; } = string.Empty;
    }
}
