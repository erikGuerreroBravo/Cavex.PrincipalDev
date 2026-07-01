using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehControlServicio
{
    public class VehControlServicioDto
    {
        public int Id { get; set; }

        public int IdVehDatosGenerales { get; set; }

        [Display(Name = "Vehiculo")]
        public string StrVehDatosGenerales { get; set; } = string.Empty;

        public int IdVehCatTipoServicio { get; set; }

        [Display(Name = "Tipo de servicio")]
        public string StrVehCatTipoServicio { get; set; } = string.Empty;

        [Display(Name = "Fecha de servicio")]
        public DateTime DteFechaServicio { get; set; }

        [Display(Name = "Kilometraje actual")]
        public decimal DecKilometrajeActual { get; set; }

        public int IdVehCatTaller { get; set; }

        [Display(Name = "Taller")]
        public string StrVehCatTaller { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        [Display(Name = "Costo mano de obra")]
        public decimal MnyCostoManoObra { get; set; }

        [Display(Name = "Costo refacciones")]
        public decimal MnyCostoRefacciones { get; set; }

        [Display(Name = "Costo total")]
        public decimal MnyCostoTotal { get; set; }

        [Display(Name = "Proximo servicio por km")]
        public int? IntProximoServicioPorKm { get; set; }

        [Display(Name = "Proximo servicio por fecha")]
        public DateTime? DteProximoServicioPorFecha { get; set; }

        public int IdVehFormaPago { get; set; }

        [Display(Name = "Forma de pago")]
        public string StrVehFormaPago { get; set; } = string.Empty;

        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        public int IdVehCatResponsableServicio { get; set; }

        [Display(Name = "Responsable de servicio")]
        public string StrVehCatResponsableServicio { get; set; } = string.Empty;
    }
}
