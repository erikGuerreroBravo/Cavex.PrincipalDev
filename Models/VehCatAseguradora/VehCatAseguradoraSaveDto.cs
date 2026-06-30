using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatAseguradora
{
    public class VehCatAseguradoraSaveDto
    {
        [Required(ErrorMessage = "El Nombre es obligatorio.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Nombre")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
