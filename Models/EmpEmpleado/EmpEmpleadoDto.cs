using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Cavex.Principal.Models.EmpEmpleado
{
    public class EmpEmpleadoDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre")]
        public string StrNombre { get; set; } = string.Empty;

        [Display(Name = "Apellido paterno")]
        public string StrApellidoPaterno { get; set; } = string.Empty;

        [Display(Name = "Apellido materno")]
        public string? StrApellidoMaterno { get; set; }

        [Display(Name = "Fecha de nacimiento")]
        public DateOnly DteFechaNacimiento { get; set; }

        [Display(Name = "RFC")]
        public string StrRfc { get; set; } = string.Empty;

        [Display(Name = "CURP")]
        public string StrCurp { get; set; } = string.Empty;

        [Display(Name = "Edad")]
        public int IntEdad { get; set; }

        [Display(Name = "Correo electronico")]
        public string StrCorreoElectronico { get; set; } = string.Empty;

        [Display(Name = "NSS")]
        public long IntNss { get; set; }

        public int IdEmpCatGenero { get; set; }

        [Display(Name = "Genero")]
        public string StrEmpCatGenero { get; set; } = string.Empty;

        public int IdEmpCatEstadoCivil { get; set; }

        [Display(Name = "Estado civil")]
        public string StrEmpCatEstadoCivil { get; set; } = string.Empty;

        public int IdEmpCatNacionalidad { get; set; }

        [Display(Name = "Nacionalidad")]
        public string StrEmpCatNacionalidad { get; set; } = string.Empty;

        public int IdEmpCatTipoContratacion { get; set; }

        [Display(Name = "Tipo de contratacion")]
        public string StrEmpCatTipoContratacion { get; set; } = string.Empty;

        public int IdEmpDireccion { get; set; }

        [Display(Name = "Direccion")]
        public string StrEmpDireccion { get; set; } = string.Empty;

        public int IdEmpDatosAcademicos { get; set; }

        [Display(Name = "Datos academicos")]
        public string StrEmpDatosAcademicos { get; set; } = string.Empty;

        public int IdEmpDocumentosLaborales { get; set; }

        [Display(Name = "Documentos laborales")]
        public string StrEmpDocumentosLaborales { get; set; } = string.Empty;

        public int IdEmpCondicionesLaborales { get; set; }

        [Display(Name = "Condiciones laborales")]
        public string StrEmpCondicionesLaborales { get; set; } = string.Empty;

        public int IdCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrCatStatus { get; set; } = string.Empty;

        public EmpDireccion.EmpDireccionDto? EmpDireccion { get; set; }
        public EmpCatDatosAcademicos.EmpDatosAcademicosDto? EmpDatosAcademicos { get; set; }
        public EmpDocumentosLaborales.EmpDocumentosLaboralesDto? EmpDocumentosLaborales { get; set; }
        public EmpCondicionesLaborales.EmpCondicionesLaboralesDto? EmpCondicionesLaborales { get; set; }

















































        public List<EmpHistorialArea.EmpHistorialAreaDto>? EmpHistorialAreas { get; set; }
        public List<EmpReferenciasPersonales.EmpReferenciasPersonalesDto>? EmpReferenciasPersonales { get; set; }
        public List<EmpExperiencia.EmpExperienciaDto>? EmpExperiencias { get; set; }
        public List<EmpTelefono.EmpTelefonoDto>? EmpTelefonos { get; set; }
    }
}
