using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTaller;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTallerService
    {
        Task<ResponseWrapper<PagedResponse<VehCatTallerDto>>> ObtenerTodosAsync(int pageIndex = 1, int pageSize = 10, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTallerDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTallerDto>> CrearAsync(VehCatTallerSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTallerDto>> EditarAsync(VehCatTallerEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
