using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehControlServicio
{
    public class VehControlServicioSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [Required(ErrorMessage = "El tipo de servicio es obligatorio.")]
        [Display(Name = "Tipo de servicio")]
        public int IdVehCatTipoServicio { get; set; }

        [Required(ErrorMessage = "La fecha de servicio es obligatoria.")]
        [Display(Name = "Fecha de servicio")]
        public DateTime DteFechaServicio { get; set; }

        [Required(ErrorMessage = "El kilometraje actual es obligatorio.")]
        [Display(Name = "Kilometraje actual")]
        public decimal DecKilometrajeActual { get; set; }

        [Required(ErrorMessage = "El taller es obligatorio.")]
        [Display(Name = "Taller")]
        public int IdVehCatTaller { get; set; }

        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        [Required(ErrorMessage = "El costo de mano de obra es obligatorio.")]
        [Display(Name = "Costo mano de obra")]
        public decimal MnyCostoManoObra { get; set; }

        [Required(ErrorMessage = "El costo de refacciones es obligatorio.")]
        [Display(Name = "Costo refacciones")]
        public decimal MnyCostoRefacciones { get; set; }

        [Display(Name = "Proximo servicio por km")]
        public int? IntProximoServicioPorKm { get; set; }

        [Display(Name = "Proximo servicio por fecha")]
        public DateTime? DteProximoServicioPorFecha { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Required(ErrorMessage = "El responsable de servicio es obligatorio.")]
        [Display(Name = "Responsable de servicio")]
        public int IdVehCatResponsableServicio { get; set; }

        [Display(Name = "Refacciones usadas")]
        public List<VehRefaccionesUsadasSaveDto> RefaccionesUsadas { get; set; } = new();
    }

    public class VehRefaccionesUsadasSaveDto
    {
        [Required(ErrorMessage = "La refaccion es obligatoria.")]
        [Display(Name = "Refaccion")]
        public int IdVehCatRefacciones { get; set; }
    }
}
