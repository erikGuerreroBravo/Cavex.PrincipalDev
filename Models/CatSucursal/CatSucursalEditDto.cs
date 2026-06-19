using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.CatSucursal
{
    public class CatSucursalEditDto : CatSucursalSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
