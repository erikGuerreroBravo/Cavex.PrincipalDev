using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatFormaPago;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatFormaPago
{
    public interface IVehCatFormaPagoApi
    {
        [Get("/api/v1/VehCatFormaPago")]
        Task<ResponseWrapper<PagedResponse<VehCatFormaPagoDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatFormaPago/{id}")]
        Task<ResponseWrapper<VehCatFormaPagoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatFormaPago")]
        Task<ResponseWrapper<VehCatFormaPagoDto>> CreateAsync([Body] VehCatFormaPagoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatFormaPago")]
        Task<ResponseWrapper<VehCatFormaPagoDto>> UpdateAsync([Body] VehCatFormaPagoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatFormaPago/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
