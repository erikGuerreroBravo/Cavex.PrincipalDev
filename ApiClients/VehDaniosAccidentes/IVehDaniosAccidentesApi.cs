using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDaniosAccidentes;
using Refit;

namespace Cavex.Principal.ApiClients.VehDaniosAccidentes
{
    public interface IVehDaniosAccidentesApi
    {
        [Get("/api/v1/VehDaniosAccidentes")]
        Task<ResponseWrapper<PagedResponse<VehDaniosAccidentesDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehDaniosAccidentes/{id}")]
        Task<ResponseWrapper<VehDaniosAccidentesDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehDaniosAccidentes")]
        Task<ResponseWrapper<VehDaniosAccidentesDto>> CreateAsync([Body] VehDaniosAccidentesSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehDaniosAccidentes")]
        Task<ResponseWrapper<VehDaniosAccidentesDto>> UpdateAsync([Body] VehDaniosAccidentesEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehDaniosAccidentes/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
