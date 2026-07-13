using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatColor;
using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatColor
{
    public interface IVehCatColorApi
    {
        [Get("/api/v1/VehCatColor")]
        
        Task<ResponseWrapper<PagedResponse<VehCatColorDto>>> GetAllAsync(
            [Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            [Query] string? search = null,
            CancellationToken cancellationToken = default);

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
