using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDaniosAccidentes;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehDaniosAccidentesService
    {
        Task<ResponseWrapper<PagedResponse<VehDaniosAccidentesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDaniosAccidentesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDaniosAccidentesDto>> CrearAsync(VehDaniosAccidentesSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDaniosAccidentesDto>> EditarAsync(VehDaniosAccidentesEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
