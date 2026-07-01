using System.ComponentModel.DataAnnotations;
namespace Cavex.Principal.Models.VehCatTipoServicio
{
    public class VehCatTipoServicioDto
    {
        public int Id { get; set; }
        [Display(Name = "Tipo de Servicio al Vehículo")]
        public string StrValor { get; set; }
        [Display(Name = "Descripcion")]
        public string StrDescripcion { get; set; }
    }
}
