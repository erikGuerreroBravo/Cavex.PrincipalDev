using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table("EmpEmpleado")]
    public class Empleado
    {
        [Key]
        public int Id { get; set; }

        public string StrNombre { get; set; } = string.Empty;

        public string StrApellidoPaterno { get; set; } = string.Empty;

        public string? StrApellidoMaterno { get; set; }

        public DateTime DteFechaNacimiento { get; set; }

        public string StrRfc { get; set; } = string.Empty;

        public string StrCurp { get; set; } = string.Empty;

        public int IntEdad { get; set; }

        public string StrCorreoElectronico { get; set; } = string.Empty;

        public int IntNss { get; set; }

        [ForeignKey("EmpCatGenero")]
        public int IdEmpCatGenero { get; set; }

        [ForeignKey("EmpCatEstadoCivil")]
        public int IdEmpCatEstadoCivil { get; set; }

        [ForeignKey("EmpCatNacionalidad")]
        public int IdEmpCatNacionalidad { get; set; }

        [ForeignKey("EmpCatTipoContratacion")]
        public int IdEmpCatTipoContratacion { get; set; }

        [ForeignKey("EmpDireccion")]
        public int IdEmpDireccion { get; set; }

        [ForeignKey("EmpDatosAcademicos")]
        public int IdEmpDatosAcademicos { get; set; }

        [ForeignKey("EmpDocumentosLaborales")]
        public int IdEmpDocumentosLaborales { get; set; }

        [ForeignKey("EmpCondicionesLaborales")]
        public int IdEmpCondicionesLaborales { get; set; }

        [ForeignKey("CatStatus")]
        public int IdCatStatus { get; set; }
    }
}
