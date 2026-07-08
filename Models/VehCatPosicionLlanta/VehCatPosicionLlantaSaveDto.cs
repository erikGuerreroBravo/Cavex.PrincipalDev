using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatPosicionLlanta
{
    public class VehCatPosicionLlantaSaveDto
    {
        [Required(ErrorMessage = "La posicion es obligatoria.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [Display(Name = "Posicion")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; } = string.Empty;
    }
}
