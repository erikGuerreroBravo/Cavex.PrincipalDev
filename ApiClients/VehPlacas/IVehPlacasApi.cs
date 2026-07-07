using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPlacas;
using Refit;

namespace Cavex.Principal.ApiClients.VehPlacas
{
    public interface IVehPlacasApi
    {
        [Get("/api/v1/VehPlacas")]
        Task<ResponseWrapper<PagedResponse<VehPlacasDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehPlacas/{id}")]
        Task<ResponseWrapper<VehPlacasDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehPlacas")]
        Task<ResponseWrapper<VehPlacasDto>> CreateAsync([Body] VehPlacasSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehPlacas")]
        Task<ResponseWrapper<VehPlacasDto>> UpdateAsync([Body] VehPlacasEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehPlacas/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
