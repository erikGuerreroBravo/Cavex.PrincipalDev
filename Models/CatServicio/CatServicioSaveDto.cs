using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.ServicioAClientes
{
    public class CatServicioSaveDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(450, ErrorMessage = "La descripcion no puede superar los 450 caracteres.")]
        public string? StrDescripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        public int IdCatStatus { get; set; } = 1;

    }
}
