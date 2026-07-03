using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlServicio;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehControlServicioService
    {
        Task<ResponseWrapper<PagedResponse<VehControlServicioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlServicioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlServicioDto>> CrearAsync(VehControlServicioSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlServicioDto>> EditarAsync(VehControlServicioEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
