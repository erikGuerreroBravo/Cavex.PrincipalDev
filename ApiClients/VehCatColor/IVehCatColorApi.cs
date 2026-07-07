using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatColor;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatColor
{
    public interface IVehCatColorApi
    {
        [Get("/api/v1/VehCatColor")]
        Task<ResponseWrapper<PagedResponse<VehCatColorDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatColor/{id}")]
        Task<ResponseWrapper<VehCatColorDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatColor")]
        Task<ResponseWrapper<VehCatColorDto>> CreateAsync([Body] VehCatColorSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatColor")]
        Task<ResponseWrapper<VehCatColorDto>> UpdateAsync([Body] VehCatColorEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatColor/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
