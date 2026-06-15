using Cavex.Principal.Common;
using Cavex.Principal.Models.ServicioAClientes;
using Refit;

namespace Cavex.Principal.ApiClients.ServicioAClientes
{
    public interface IServicioAClientesApi
    {

        [Get("/api/v1/{controller}")]
        Task<ResponseWrapper<List<ServicioAClienteDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/{controller]/{id}")]
        Task<ResponseWrapper<ServicioAClienteDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/{controller}")]
        Task<ResponseWrapper<ServicioAClienteDto>> CreateAsync([Body] ServicioAClienteDto request, CancellationToken cancellationToken = default);

        [Put("/api/v1/{controller}/{id}")]
        Task<ResponseWrapper<ServicioAClienteDto>> UpdateAsync(int id, [Body] ServicioAClienteDto request, CancellationToken cancellationToken = default);

        [Delete("/api/v1/{controller}/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default); 
    }
}
