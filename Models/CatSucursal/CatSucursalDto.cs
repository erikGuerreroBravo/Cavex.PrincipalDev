using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.CatSucursal
{
    public class CatSucursalDto
    {
        public int Id { get; set; }
        
        [Display(Name = "Nombre")]
        public string StrValor { get; set; }

        [Display(Name = "Ubicacion")]
        public string StrDescripcion { get; set; }

        public int IdCatStatus { get; set; }

        [Display(Name = "Estatus")]
        public string StrCatStatus { get; set; } = string.Empty;
    }
}
