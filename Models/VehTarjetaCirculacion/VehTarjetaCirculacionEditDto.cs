using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTarjetaCirculacion
{
    public class VehTarjetaCirculacionEditDto : VehTarjetaCirculacionSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
