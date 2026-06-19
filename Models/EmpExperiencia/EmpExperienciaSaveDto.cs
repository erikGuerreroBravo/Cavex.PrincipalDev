using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Models.EmpExperiencia
{
    public class EmpExperienciaSaveDto
    {
        [Required(ErrorMessage = "La empresa es obligatoria.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Empresa")]
        public string StrEmpresa { get; set; } = string.Empty;

        [Required(ErrorMessage = "El puesto es obligatorio.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Puesto")]
        public string StrPuesto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El area es obligatoria.")]
        [StringLength(200, ErrorMessage = "El valor no puede superar los 200 caracteres.")]
        [Display(Name = "Area")]
        public string StrArea { get; set; } = string.Empty;

        [Required(ErrorMessage = "La fecha de inicio es obligatoria.")]
        [Display(Name = "Fecha de inicio")]
        public DateTime DteFechaIncio { get; set; }

        [Required(ErrorMessage = "La fecha de fin es obligatoria.")]
        [Display(Name = "Fecha de fin")]
        public DateTime DteFechaFin { get; set; }

        [Required(ErrorMessage = "El sueldo es obligatorio.")]
        [Display(Name = "Sueldo")]
        public decimal MnySueldo { get; set; }

        [Required(ErrorMessage = "El motivo de salida es obligatorio.")]
        [StringLength(500, ErrorMessage = "El valor no puede superar los 500 caracteres.")]
        [Display(Name = "Motivo de salida")]
        public string StrMotivoSalida { get; set; } = string.Empty;

        [Required(ErrorMessage = "El empleado es obligatorio.")]
        [Display(Name = "Empleado")]
        public int IdEmpEmpleado { get; set; }
    }
}
