using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatHolograma;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatHolograma
{
    public interface IVehCatHologramaApi
    {
        [Get("/api/v1/VehCatHolograma")]
        Task<ResponseWrapper<PagedResponse<VehCatHologramaDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatHolograma/{id}")]
        Task<ResponseWrapper<VehCatHologramaDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatHolograma")]
        Task<ResponseWrapper<VehCatHologramaDto>> CreateAsync([Body] VehCatHologramaSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatHolograma")]
        Task<ResponseWrapper<VehCatHologramaDto>> UpdateAsync([Body] VehCatHologramaEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatHolograma/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
