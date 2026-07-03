using Cavex.Principal.Common;
using Cavex.Principal.Models.VehInfracciones;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehInfraccionesService
    {
        Task<ResponseWrapper<PagedResponse<VehInfraccionesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehInfraccionesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehInfraccionesDto>> CrearAsync(VehInfraccionesSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehInfraccionesDto>> EditarAsync(VehInfraccionesEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
