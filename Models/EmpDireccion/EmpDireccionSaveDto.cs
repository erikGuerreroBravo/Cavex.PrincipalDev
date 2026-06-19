using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpDireccion
{
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
}
