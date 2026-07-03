using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlLlanta;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehControlLlantaService
    {
        Task<ResponseWrapper<PagedResponse<VehControlLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlLlantaDto>> CrearAsync(VehControlLlantaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlLlantaDto>> EditarAsync(VehControlLlantaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
