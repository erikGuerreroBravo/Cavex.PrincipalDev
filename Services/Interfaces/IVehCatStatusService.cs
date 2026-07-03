using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatStatus;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatStatusService
    {
        Task<ResponseWrapper<PagedResponse<VehCatStatusDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatStatusDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatStatusDto>> CrearAsync(VehCatStatusSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatStatusDto>> EditarAsync(VehCatStatusEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
