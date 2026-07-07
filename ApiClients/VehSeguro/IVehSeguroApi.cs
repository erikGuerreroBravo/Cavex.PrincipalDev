using Cavex.Principal.Common;
using Cavex.Principal.Models.VehSeguro;
using Refit;

namespace Cavex.Principal.ApiClients.VehSeguro
{
    public interface IVehSeguroApi
    {
        [Get("/api/v1/VehSeguro")]
        Task<ResponseWrapper<PagedResponse<VehSeguroDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehSeguro/{id}")]
        Task<ResponseWrapper<VehSeguroDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehSeguro")]
        Task<ResponseWrapper<VehSeguroDto>> CreateAsync([Body] VehSeguroSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehSeguro")]
        Task<ResponseWrapper<VehSeguroDto>> UpdateAsync([Body] VehSeguroEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehSeguro/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
