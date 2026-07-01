using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehTenencia
{
    public class VehTenenciaEditDto : VehTenenciaSaveDto
    {
        [Required]
        public int Id { get; set; }
    }
}
