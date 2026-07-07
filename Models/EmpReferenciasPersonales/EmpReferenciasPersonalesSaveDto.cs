using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpReferenciasPersonales
{
    public class EmpReferenciasPersonalesSaveDto
    {
        [Required(ErrorMessage = "El nombre completo es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Nombre completo")]
        public string StrNombreCompleto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El parentezco es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Parentezco")]
        public string StrParentezco { get; set; } = string.Empty;

        [Required(ErrorMessage = "El telefono es obligatorio.")]
        [Display(Name = "Telefono")]
        public long IntTelefono { get; set; }

        
    }
}
