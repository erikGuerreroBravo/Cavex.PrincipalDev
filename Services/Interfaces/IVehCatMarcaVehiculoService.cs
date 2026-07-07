using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatMarcaVehiculo;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatMarcaVehiculoService
    {
        Task<ResponseWrapper<PagedResponse<VehCatMarcaVehiculoDto>>> ObtenerTodosAsync(int pageIndex = 1, int pageSize = 10, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> CrearAsync(VehCatMarcaVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> EditarAsync(VehCatMarcaVehiculoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
