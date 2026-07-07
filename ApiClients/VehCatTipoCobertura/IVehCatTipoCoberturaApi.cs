using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCoberura;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatTipoCobertura
{
    public interface IVehCatTipoCoberturaApi
    {
        [Get("/api/v1/VehCatTipoCobertura")]
        Task<ResponseWrapper<PagedResponse<VehCatTipoCoberturaDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatTipoCobertura/{id}")]
        Task<ResponseWrapper<VehCatTipoCoberturaDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatTipoCobertura")]
        Task<ResponseWrapper<VehCatTipoCoberturaDto>> CreateAsync([Body] VehCatTipoCoberturaSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatTipoCobertura")]
        Task<ResponseWrapper<VehCatTipoCoberturaDto>> UpdateAsync([Body] VehCatTipoCoberturaEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatTipoCobertura/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
