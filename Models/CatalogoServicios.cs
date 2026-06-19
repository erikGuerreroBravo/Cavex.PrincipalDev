using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cavex.Principal.Models
{
    [Table ("CatServcios")]
    public class CatalogoServicios
    {
        [Key]
        public int Id { get; set; }

        public string StrValor { get; set; } = string.Empty;

        public string? StrDescripcion { get; set; }

        [ForeignKey("CatStatus")]
        public int IdCatStatus { get; set; }
    }
}
