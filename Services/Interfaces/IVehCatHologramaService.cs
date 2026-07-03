using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatHolograma;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatHologramaService
    {
        Task<ResponseWrapper<PagedResponse<VehCatHologramaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatHologramaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatHologramaDto>> CrearAsync(VehCatHologramaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatHologramaDto>> EditarAsync(VehCatHologramaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
