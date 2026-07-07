using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoPermiso;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTipoPermisoService
    {
        Task<ResponseWrapper<PagedResponse<VehCatTipoPermisoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoPermisoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoPermisoDto>> CrearAsync(VehCatTipoPermisoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoPermisoDto>> EditarAsync(VehCatTipoPermisoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
