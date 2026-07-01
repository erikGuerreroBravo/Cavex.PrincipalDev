using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoPermiso
{
    public class VehCatTipoPermisoEditDto: VehCatTipoPermisoSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
