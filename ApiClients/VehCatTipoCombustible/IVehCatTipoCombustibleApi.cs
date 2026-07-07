using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCombustible;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatTipoCombustible
{
    public interface IVehCatTipoCombustibleApi
    {
        [Get("/api/v1/VehCatTipoCombustible")]
        Task<ResponseWrapper<PagedResponse<VehCatTipoCombustibleDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatTipoCombustible/{id}")]
        Task<ResponseWrapper<VehCatTipoCombustibleDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatTipoCombustible")]
        Task<ResponseWrapper<VehCatTipoCombustibleDto>> CreateAsync([Body] VehCatTipoCombustibleSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatTipoCombustible")]
        Task<ResponseWrapper<VehCatTipoCombustibleDto>> UpdateAsync([Body] VehCatTipoCombustibleEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatTipoCombustible/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
