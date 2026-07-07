using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpEmpleado
{
    public class EmpEmpleadoSaveDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Nombre")]
        public string StrNombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El apellido paterno es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Apellido paterno")]
        public string StrApellidoPaterno { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Apellido materno")]
        public string? StrApellidoMaterno { get; set; }

        [Required(ErrorMessage = "La fecha de nacimiento es obligatoria.")]
        [Display(Name = "Fecha de nacimiento")]
        public DateOnly DteFechaNacimiento { get; set; }

        [Required(ErrorMessage = "El RFC es obligatorio.")]
        [StringLength(50, ErrorMessage = "El valor no puede superar los 50 caracteres.")]
        [Display(Name = "RFC")]
        public string StrRfc { get; set; } = string.Empty;

        [Required(ErrorMessage = "El CURP es obligatorio.")]
        [StringLength(20, ErrorMessage = "El valor no puede superar los 20 caracteres.")]
        [Display(Name = "CURP")]
        public string StrCurp { get; set; } = string.Empty;

        [Required(ErrorMessage = "La edad es obligatoria.")]
        [Display(Name = "Edad")]
        public int IntEdad { get; set; }

        [Required(ErrorMessage = "El correo electronico es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [EmailAddress(ErrorMessage = "El correo electronico no es valido.")]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$", ErrorMessage = "Solo se permiten correos de gmail.com, hotmail.com, outlook.com o yahoo.com.")]
        [Display(Name = "Correo electronico")]
        public string StrCorreoElectronico { get; set; } = string.Empty;

        [Required(ErrorMessage = "El NSS es obligatorio.")]
        [Display(Name = "NSS")]
        public long IntNss { get; set; }

        [Required(ErrorMessage = "El genero es obligatorio.")]
        [Display(Name = "Genero")]
        public int IdEmpCatGenero { get; set; }

        [Required(ErrorMessage = "El estado civil es obligatorio.")]
        [Display(Name = "Estado civil")]
        public int IdEmpCatEstadoCivil { get; set; }

        [Required(ErrorMessage = "La nacionalidad es obligatoria.")]
        [Display(Name = "Nacionalidad")]
        public int IdEmpCatNacionalidad { get; set; }

        [Required(ErrorMessage = "El tipo de contratacion es obligatorio.")]
        [Display(Name = "Tipo de contratacion")]
        public int IdEmpCatTipoContratacion { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdCatStatus { get; set; }

        

        [Required(ErrorMessage = "La direccion es obligatoria.")]
        [Display(Name = "Direccion")]
        public EmpDireccionSaveDto Direccion { get; set; } = new();

        [Required(ErrorMessage = "Los datos academicos son obligatorios.")]
        [Display(Name = "Datos academicos")]
        public EmpDatosAcademicosSaveDto DatosAcademicos { get; set; } = new();

        [Required(ErrorMessage = "Los documentos laborales son obligatorios.")]
        [Display(Name = "Documentos laborales")]
        public EmpDocumentosLaboralesSaveDto DocumentosLaborales { get; set; } = new();

        [Required(ErrorMessage = "Las condiciones laborales son obligatorias.")]
        [Display(Name = "Condiciones laborales")]
        public EmpCondicionesLaboralesSaveDto CondicionesLaborales { get; set; } = new();

        [Display(Name = "Referencias")]
        public List<EmpReferenciaSaveDto> Referencias { get; set; } = new();

        [Display(Name = "Experiencia laboral")]
        public List<EmpExperienciaLaboralSaveDto> ExperienciaLaboral { get; set; } = new();

        [Display(Name = "Área laboral")]
        public int IdEmpCatAreaLaboral { get; set; }

        [Display(Name = "Telefonos")]
        public List<EmpTelefono.EmpTelefonoSaveDto> Telefonos { get; set; } = new();
    }

    public class EmpDireccionSaveDto
    {
        [Required(ErrorMessage = "La colonia es obligatoria.")]
        [Display(Name = "Colonia")]
        public int IdEmpCatColonia { get; set; }

        [Display(Name = "Numero exterior")]
        public int? IntNumExterior { get; set; }

        [Display(Name = "Numero interior")]
        public int? IntNumInterior { get; set; }
    }

    public class EmpDatosAcademicosSaveDto
    {
        [Required(ErrorMessage = "El nivel de estudios es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Nivel de estudios")]
        public string StrNivelEstudios { get; set; } = string.Empty;

        [Required(ErrorMessage = "La institucion es obligatoria.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Institucion")]
        public string StrInstitucion { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Carrera")]
        public string? StrCarrera { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Estatus")]
        public string StrEstatus { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateOnly DteFechaInicio { get; set; }

        [Required(ErrorMessage = "La fecha de termino es obligatoria.")]
        [Display(Name = "Fecha de termino")]
        public DateOnly DteFechaFin { get; set; }
    }

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
        public string StrUrlFotoEmp { get; set; } = string.Empty;
    }

    public class EmpCondicionesLaboralesSaveDto
    {
        [Display(Name = "Cercania a la vivienda")]
        public bool BitCercaniaVivienda { get; set; }

        [Display(Name = "Disponibilidad de viaje")]
        public bool BitDisponibilidadDeViaje { get; set; }

        [Required(ErrorMessage = "El sueldo mensual es obligatorio.")]
        [Display(Name = "Sueldo mensual")]
        public decimal MnySueldoMensual { get; set; }

        [Display(Name = "Experiencia en el area")]
        public bool BitExperienciaEnArea { get; set; }

        [Display(Name = "Disponibilidad de cambio de residencia")]
        public bool BitDisponibilidadCambioResidencia { get; set; }

        [Required(ErrorMessage = "La fecha de ingreso es obligatoria.")]
        [Display(Name = "Fecha de ingreso")]
        public DateOnly DteFechaIngreso { get; set; }
    }

    public class EmpReferenciaSaveDto
    {
        [Required(ErrorMessage = "El nombre completo es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Nombre completo")]
        public string StrNombreCompleto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El parentezco es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Parentezco")]
        public string StrParentezco { get; set; } = string.Empty;

        [Required(ErrorMessage = "El telefono es obligatorio.")]
        [Display(Name = "Telefono")]
        public long IntTelefono { get; set; }
    }

    public class EmpExperienciaLaboralSaveDto
    {
        [Required(ErrorMessage = "La empresa es obligatoria.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Empresa")]
        public string StrEmpresa { get; set; } = string.Empty;

        [Required(ErrorMessage = "El puesto es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Puesto")]
        public string StrPuesto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El area es obligatoria.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Area")]
        public string StrArea { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateOnly DteFechaIncio { get; set; }

        [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
        [Display(Name = "Fecha de fin")]
        public DateOnly DteFechaFin { get; set; }

        [Required(ErrorMessage = "El sueldo es obligatorio.")]
        [Display(Name = "Sueldo")]
        public decimal MnySueldo { get; set; }

        [Required(ErrorMessage = "El motivo de salida es obligatorio.")]
        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Motivo de salida")]
        public string StrMotivoSalida { get; set; } = string.Empty;
    }
}
