using System.ComponentModel.DataAnnotations;

namespace Cavex.Principal.Common
{
    public class RequestWrapper<T>
    {
        [Required]
        public T? Body { get; set; }

        public static RequestWrapper<T> Create(T body)
        {
            return new RequestWrapper<T>
            {
                Body = body
            };  
        }
    }
}
