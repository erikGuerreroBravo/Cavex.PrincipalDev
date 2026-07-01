using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoPermiso
{
    public class VehCatTipoPermisoDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Permiso")]
        public string StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
