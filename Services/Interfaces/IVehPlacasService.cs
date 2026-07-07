using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPlacas;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehPlacasService
    {
        Task<ResponseWrapper<PagedResponse<VehPlacasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPlacasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPlacasDto>> CrearAsync(VehPlacasSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPlacasDto>> EditarAsync(VehPlacasEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
