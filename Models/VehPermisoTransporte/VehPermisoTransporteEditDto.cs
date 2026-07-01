using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehPermisoTransporte
{
    public class VehPermisoTransporteEditDto : VehPermisoTransporteSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
