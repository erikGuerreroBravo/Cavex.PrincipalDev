using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.VehCatMarcaVehiculo
{
    public class VehCatMarcaVehiculoSaveDto
    {
        [Required(ErrorMessage = "La marca es obligatoria.")]
        [MinLength(3, ErrorMessage = "El nombre de la marca debe tener al menos 3 caracteres.")]
        [StringLength(100, ErrorMessage = "El valor no puede superar los 100 caracteres.")]
        [RegularExpression(@"^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ])[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ#.,_()\/\-\s]+$", 
            ErrorMessage = "La marca debe contener al menos una letra y no tener caracteres especiales inválidos.")]
        [Display(Name = "Marca")]
        public string StrValor { get; set; } = string.Empty;


        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; } = string.Empty;
    }
}
