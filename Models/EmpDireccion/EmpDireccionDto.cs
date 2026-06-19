using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDireccion
{
    public class EmpDireccionDto
    {
        public int Id { get; set; }

        public int IdEmpCatColonia { get; set; }

        [Display(Name = "Colonia")]
        public string StrEmpCatColonia { get; set; } = string.Empty;

        [Display(Name = "Numero exterior")]
        public int? IntNumExterior { get; set; }

        [Display(Name = "Numero interior")]
        public int? IntNumInterior { get; set; }
    }
}
