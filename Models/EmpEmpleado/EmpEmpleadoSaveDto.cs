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
        public DateTime DteFechaNacimiento { get; set; }

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
        [Display(Name = "Correo electronico")]
        public string StrCorreoElectronico { get; set; } = string.Empty;

        [Required(ErrorMessage = "El NSS es obligatorio.")]
        [Display(Name = "NSS")]
        public int IntNss { get; set; }

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

        [Required(ErrorMessage = "La direccion es obligatoria.")]
        [Display(Name = "Direccion")]
        public int IdEmpDireccion { get; set; }

        [Required(ErrorMessage = "Los datos academicos son obligatorios.")]
        [Display(Name = "Datos academicos")]
        public int IdEmpDatosAcademicos { get; set; }

        [Required(ErrorMessage = "Los documentos laborales son obligatorios.")]
        [Display(Name = "Documentos laborales")]
        public int IdEmpDocumentosLaborales { get; set; }

        [Required(ErrorMessage = "Las condiciones laborales son obligatorias.")]
        [Display(Name = "Condiciones laborales")]
        public int IdEmpCondicionesLaborales { get; set; }

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        [Display(Name = "Estatus")]
        public int IdCatStatus { get; set; }
    }
}
