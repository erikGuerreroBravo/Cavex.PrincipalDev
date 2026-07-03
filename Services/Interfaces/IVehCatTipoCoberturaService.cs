using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCoberura;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTipoCoberturaService
    {
        Task<ResponseWrapper<PagedResponse<VehCatTipoCoberturaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCoberturaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCoberturaDto>> CrearAsync(VehCatTipoCoberturaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCoberturaDto>> EditarAsync(VehCatTipoCoberturaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
