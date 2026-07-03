using Cavex.Principal.Common;
using Cavex.Principal.Models.VehAsignacionVehiculos;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehAsignacionVehiculosService
    {
        Task<ResponseWrapper<PagedResponse<VehAsignacionVehiculosDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehAsignacionVehiculosDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehAsignacionVehiculosDto>> CrearAsync(VehAsignacionVehiculosSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehAsignacionVehiculosDto>> EditarAsync(VehAsignacionVehiculosEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
