using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehDocumentosVehiculo
{
    public class VehDocumentosVehiculoSaveDto
    {
        [Required(ErrorMessage = "El vehiculo es obligatorio.")]
        [Display(Name = "Vehiculo")]
        public int IdVehDatosGenerales { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Factura")]
        public string? StrUrlFactura { get; set; }

        [Display(Name = "Tarjeta de circulacion")]
        public VehTarjetaCirculacionSaveDto? TarjetaCirculacion { get; set; }

        [Display(Name = "Tenencia")]
        public VehTenenciaSaveDto? Tenencia { get; set; }

        [Display(Name = "Verificacion")]
        public VehVerificacionSaveDto? Verificacion { get; set; }

        [Display(Name = "Seguro")]
        public VehSeguroSaveDto? Seguro { get; set; }

        [Display(Name = "Permiso de transporte")]
        public VehPermisoTransporteSaveDto? PermisoTransporte { get; set; }

        [Display(Name = "Revista vehicular")]
        public VehRevistaVehicularSaveDto? RevistaVehicular { get; set; }

        [Display(Name = "Contrato de arrendamiento")]
        public VehContratoArrendamientoSaveDto? ContratoArrendamiento { get; set; }

        [Display(Name = "Placas")]
        public VehPlacasSaveDto? Placas { get; set; }
    }

    public class VehTarjetaCirculacionSaveDto
    {
        [Required(ErrorMessage = "El numero de tarjeta es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de tarjeta")]
        public string StrNumeroTarjeta { get; set; } = string.Empty;

        [Required(ErrorMessage = "La entidad federativa es obligatoria.")]
        [Display(Name = "Entidad federativa")]
        public int IdEmpCatEntidadFederativa { get; set; }

        [Required(ErrorMessage = "La fecha de expedicion es obligatoria.")]
        [Display(Name = "Fecha de expedicion")]
        public DateTime DteFechaExpedicion { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Tarjeta")]
        public string? StrUrlTarjeta { get; set; }
    }

    public class VehTenenciaSaveDto
    {
        [Required(ErrorMessage = "El anio es obligatorio.")]
        [Display(Name = "Anio")]
        public int IntAnio { get; set; }

        [Required(ErrorMessage = "La fecha de pago es obligatoria.")]
        [Display(Name = "Fecha de pago")]
        public DateTime DteFechaPago { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Folio de pago")]
        public string? StrFolioPago { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehCatFormaPago { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Formato de tenencia")]
        public string? StrUrlFormatoTenencia { get; set; }
    }

    public class VehVerificacionSaveDto
    {
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

    public class VehSeguroSaveDto
    {
        [Required(ErrorMessage = "La aseguradora es obligatoria.")]
        [Display(Name = "Aseguradora")]
        public int IdVehCatAseguradora { get; set; }

        [Required(ErrorMessage = "El numero de poliza es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de poliza")]
        public string StrNumeroPoliza { get; set; } = string.Empty;

        [Required(ErrorMessage = "El monto de cobertura es obligatorio.")]
        [Display(Name = "Monto de cobertura")]
        public decimal MnyMontoCoberura { get; set; }

        [Required(ErrorMessage = "El tipo de cobertura es obligatorio.")]
        [Display(Name = "Tipo de cobertura")]
        public int IdVehCatTipoCobertura { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Poliza de seguro")]
        public string? StrUrlPolizaSeguro { get; set; }
    }

    public class VehPermisoTransporteSaveDto
    {
        [Required(ErrorMessage = "El numero de permiso es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de permiso")]
        public string StrNumeroPermiso { get; set; } = string.Empty;

        [Required(ErrorMessage = "El tipo de permiso es obligatorio.")]
        [Display(Name = "Tipo de permiso")]
        public int IdVehCatTipoPermiso { get; set; }

        [Required(ErrorMessage = "La autoridad es obligatoria.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Autoridad")]
        public string StrAutoridad { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de expedicion es obligatoria.")]
        [Display(Name = "Fecha de expedicion")]
        public DateTime DteFechaExpedicion { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Permiso de transporte")]
        public string? StrUrlPermisoTransporte { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }
    }

    public class VehRevistaVehicularSaveDto
    {
        [Required(ErrorMessage = "El folio de revista es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Folio de revista")]
        public string StrFolioRevista { get; set; } = string.Empty;

        [Required(ErrorMessage = "El resultado es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Resultado")]
        public string StrResultado { get; set; } = string.Empty;

        [Required(ErrorMessage = "El inspector es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Inspector")]
        public string StrInspector { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de revista es obligatoria.")]
        [Display(Name = "Fecha de revista")]
        public DateTime DteFechaRevista { get; set; }

        [Required(ErrorMessage = "La proxima revista es obligatoria.")]
        [Display(Name = "Proxima revista")]
        public DateTime DteProximaRevista { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Revista vehicular")]
        public string? StrUrlRevistaVehicular { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }
    }

    public class VehContratoArrendamientoSaveDto
    {
        [Required(ErrorMessage = "El arrendatario es obligatorio.")]
        [Display(Name = "Arrendatario")]
        public int IdVehCatArrendatario { get; set; }

        [Required(ErrorMessage = "El numero de contrato es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de contrato")]
        public string StrNumeroContrato { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Periodo de pago")]
        public string? StrPeriodoPago { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Contrato de arrendamiento")]
        public string? StrUrlContratoArrendamiento { get; set; }
    }

    public class VehPlacasSaveDto
    {
        [Required(ErrorMessage = "El numero de placa es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "Numero de placa")]
        public string StrNumPlaca { get; set; } = string.Empty;

        [Required(ErrorMessage = "La entidad federativa es obligatoria.")]
        [Display(Name = "Entidad federativa")]
        public int IdEmpCatEntidadFederativa { get; set; }

        [Required(ErrorMessage = "La fecha de asignacion es obligatoria.")]
        [Display(Name = "Fecha de asignacion")]
        public DateTime DteFechaAsignacion { get; set; }

        [Required(ErrorMessage = "La fecha de vencimiento es obligatoria.")]
        [Display(Name = "Fecha de vencimiento")]
        public DateTime DteFechaVencimiento { get; set; }

        [Required(ErrorMessage = "El monto pagado es obligatorio.")]
        [Display(Name = "Monto pagado")]
        public decimal MnyMontoPagado { get; set; }

        [Required(ErrorMessage = "La forma de pago es obligatoria.")]
        [Display(Name = "Forma de pago")]
        public int IdVehCatFormaPago { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Comprobante de pago")]
        public string? StrUrlComprobantePago { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdVehCatStatus { get; set; }

        [StringLength(2048, ErrorMessage = "El valor no puede superar los 2048 caracteres.")]
        [Display(Name = "Placas")]
        public string? StrUrlPlacas { get; set; }
    }
}
