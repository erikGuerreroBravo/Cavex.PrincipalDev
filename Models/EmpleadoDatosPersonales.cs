namespace Cavex.Principal.Models
{
    public class EmpleadoDatosPersonales
    {
        public int Id { get; set; }
        public string strNombre { get; set; }
        public string strApellidoPat {  get; set; }
        public string strApellidoMat {  get; set; }
        public DateOnly dtFechaNac {  get; set; }
        public string strCurp {  get; set; }
        public string strRfc {  get; set; }
        public int Edad {  get; set; }
    }
}
