using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatColor;
using Cavex.Principal.Models.VehCatMarcaVehiculo;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatColorService
    {
                
        Task<ResponseWrapper<PagedResponse<VehCatColorDto>>> ObtenerTodosAsync(int pageIndex = 1, int pageSize = 10, string? search = null, CancellationToken cancellationToken = default);
        Task<ResponseWrapper<VehCatColorDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatColorDto>> CrearAsync(VehCatColorSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatColorDto>> EditarAsync(VehCatColorEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
