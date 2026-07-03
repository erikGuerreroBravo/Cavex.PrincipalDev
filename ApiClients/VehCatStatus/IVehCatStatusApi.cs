using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatStatus;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatStatus
{
    public interface IVehCatStatusApi
    {
        [Get("/api/v1/VehCatStatus")]
        Task<ResponseWrapper<PagedResponse<VehCatStatusDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatStatus/{id}")]
        Task<ResponseWrapper<VehCatStatusDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatStatus")]
        Task<ResponseWrapper<VehCatStatusDto>> CreateAsync([Body] VehCatStatusSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatStatus")]
        Task<ResponseWrapper<VehCatStatusDto>> UpdateAsync([Body] VehCatStatusEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatStatus/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
