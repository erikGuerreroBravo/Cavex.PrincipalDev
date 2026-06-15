using System.Net;
using System.Text.Json.Serialization;

namespace Cavex.Principal.Common
{
    public class ResponseWrapper<T>
    {
        public HttpStatusCode StatusCode { get; set; }

        public string? Message { get; set; }
        public T? Data { get; set; }

        [JsonIgnore]
        public bool Success => (int)StatusCode >= 200 && (int)StatusCode <= 299;

        public static ResponseWrapper<T> Ok(T data, string message = "")
        {
            return new ResponseWrapper<T>
            {
                StatusCode = HttpStatusCode.OK,
                Message = message,
                Data = data
            };
        }

        public static ResponseWrapper<T> Fail(string message, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            return new ResponseWrapper<T>
            {
                StatusCode = statusCode,
                Message = message
            };
        }
    }
}
