using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlServicio;
using Refit;

namespace Cavex.Principal.ApiClients.VehControlServicio
{
    public interface IVehControlServicioApi
    {
        [Get("/api/v1/VehControlServicio")]
        Task<ResponseWrapper<PagedResponse<VehControlServicioDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehControlServicio/{id}")]
        Task<ResponseWrapper<VehControlServicioDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehControlServicio")]
        Task<ResponseWrapper<VehControlServicioDto>> CreateAsync([Body] VehControlServicioSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehControlServicio")]
        Task<ResponseWrapper<VehControlServicioDto>> UpdateAsync([Body] VehControlServicioEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehControlServicio/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
