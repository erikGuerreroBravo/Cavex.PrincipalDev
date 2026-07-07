using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpCatColonia
{
    public class EmpCatColoniaDto
    {
        public int Id { get; set; }

        [Display(Name = "Nombre")]
        public string StrValor { get; set; } = string.Empty;

        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; }

        [Display(Name = "Codigo Postal")]
        public int IntCodigoPostal { get; set; }

        [Display(Name = "Tipo de Asentamiento")]
        public string StrTipoAsentamiento { get; set; }

        [Display(Name = "Municipio")]
        public string StrEmpCatMunicipio { get; set; } = string.Empty;

        public string? StrMunicipio { get; set; }
        public string? StrEstado { get; set; }
    }
}
