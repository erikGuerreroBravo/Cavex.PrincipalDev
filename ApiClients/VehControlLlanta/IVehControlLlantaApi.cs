using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlLlanta;
using Refit;

namespace Cavex.Principal.ApiClients.VehControlLlanta
{
    public interface IVehControlLlantaApi
    {
        [Get("/api/v1/VehControlLlanta")]
        Task<ResponseWrapper<PagedResponse<VehControlLlantaDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehControlLlanta/{id}")]
        Task<ResponseWrapper<VehControlLlantaDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehControlLlanta")]
        Task<ResponseWrapper<VehControlLlantaDto>> CreateAsync([Body] VehControlLlantaSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehControlLlanta")]
        Task<ResponseWrapper<VehControlLlantaDto>> UpdateAsync([Body] VehControlLlantaEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehControlLlanta/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
