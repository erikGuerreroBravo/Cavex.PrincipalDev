using Cavex.Principal.Common;
using Cavex.Principal.Models.ServicioAClientes;
using Refit;

namespace Cavex.Principal.ApiClients.ServicioAClientes
{
    public interface IServicioAClientesApi
    {

        [Get("/api/v1/CatServicios")]  
        Task<ResponseWrapper<PagedResponse<CatServicioSaveDto>>> GetAllAsync(
            [Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            CancellationToken cancellationToken = default);

        // Recordar
        [Get("/api/v1/CatServicios/{id}")]
        Task<ResponseWrapper<CatServicioSaveDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);
                
        [Post("/api/v1/CatServicios")]
        Task<ResponseWrapper<CatServicioSaveDto>> CreateAsync([Body] RequestWrapper<CatServicioSaveDto> request, CancellationToken cancellationToken = default);

        [Put("/api/v1/CatServicios/{id}")]
        Task<ResponseWrapper<CatServicioSaveDto>> UpdateAsync(int id, [Body] RequestWrapper<CatServicioSaveDto> request, CancellationToken cancellationToken = default);

        [Delete("/api/v1/CatServicios/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default); 
    }
}
