using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatCapacidad
{
    public class VehCatCapacidadSaveDto
    {
        [Required(ErrorMessage = "La capacidad es obligatoria.")]
        [StringLength(150, ErrorMessage = "El valor no puede superar los 150 caracteres.")]
        [Display(Name = "Capacidad")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(450, ErrorMessage = "El valor no puede superar los 450 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; } = string.Empty;
    }
}
