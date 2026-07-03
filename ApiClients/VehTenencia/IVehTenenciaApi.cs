using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTenencia;
using Refit;

namespace Cavex.Principal.ApiClients.VehTenencia
{
    public interface IVehTenenciaApi
    {
        [Get("/api/v1/VehTenencia")]
        Task<ResponseWrapper<PagedResponse<VehTenenciaDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehTenencia/{id}")]
        Task<ResponseWrapper<VehTenenciaDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehTenencia")]
        Task<ResponseWrapper<VehTenenciaDto>> CreateAsync([Body] VehTenenciaSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehTenencia")]
        Task<ResponseWrapper<VehTenenciaDto>> UpdateAsync([Body] VehTenenciaEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehTenencia/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
