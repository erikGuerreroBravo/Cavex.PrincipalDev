using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoVehiculo;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTipoVehiculoService
    {
        
        Task<ResponseWrapper<PagedResponse<VehCatTipoVehiculoDto>>> ObtenerTodosAsync(int pageIndex = 1, int pageSize = 10, string? search = null,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoVehiculoDto>> CrearAsync(VehCatTipoVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoVehiculoDto>> EditarAsync(VehCatTipoVehiculoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
