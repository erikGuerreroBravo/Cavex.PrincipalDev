using Cavex.Principal.Models.ServicioAClientes;
using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.CatServicio
{
    public class CatServicioEditDto : CatServicioSaveDto
    {
        [Required]
        public new int Id { get; set; }
    }
}
