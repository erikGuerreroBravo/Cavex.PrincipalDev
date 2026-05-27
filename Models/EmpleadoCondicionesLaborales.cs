namespace Cavex.Principal.Models
{
    public class EmpleadoCondicionesLaborales
    {
        public int Id { get; set; }
        public bool ViveEnLugarDeTrabajo { get; set; }
        public bool DisponibilidadDeViaje {  get; set; }
        public bool DisponibilidadDeCambio { get; set; }
        public double SueldoMensual {  get; set; }
        public bool ExperienciaEnElCampo { get; set; }
        public DateOnly FechaIngreso { get; set; }
    }
}
