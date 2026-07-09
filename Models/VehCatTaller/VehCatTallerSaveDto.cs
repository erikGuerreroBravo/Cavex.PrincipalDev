using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatTaller
{
    public class VehCatTallerSaveDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [MinLength(3, ErrorMessage = "El nombre del taller debe tener al menos 3 caracteres.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [RegularExpression(@"^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ#.,_()\/\-\s]+$", 
            ErrorMessage = "El taller debe contener al menos una letra y no tener caracteres especiales inválidos.")]
        [Display(Name = "Nombre")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string? StrDescripcion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El estatus es obligatorio.")]
        public int IdCatStatus { get; set; } = 1;
    }
}

