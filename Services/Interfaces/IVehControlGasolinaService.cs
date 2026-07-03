using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlGasolina;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehControlGasolinaService
    {
        Task<ResponseWrapper<PagedResponse<VehControlGasolinaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlGasolinaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlGasolinaDto>> CrearAsync(VehControlGasolinaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehControlGasolinaDto>> EditarAsync(VehControlGasolinaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
