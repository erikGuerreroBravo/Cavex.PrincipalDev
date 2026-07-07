using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoServicio;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTipoServicioService
    {
        Task<ResponseWrapper<PagedResponse<VehCatTipoServicioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoServicioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoServicioDto>> CrearAsync(VehCatTipoServicioSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoServicioDto>> EditarAsync(VehCatTipoServicioEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
