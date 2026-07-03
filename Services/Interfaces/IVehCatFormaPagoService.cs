using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatFormaPago;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatFormaPagoService
    {
        Task<ResponseWrapper<PagedResponse<VehCatFormaPagoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatFormaPagoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatFormaPagoDto>> CrearAsync(VehCatFormaPagoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatFormaPagoDto>> EditarAsync(VehCatFormaPagoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
