using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoPermiso;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatTipoPermiso
{
    public interface IVehCatTipoPermisoApi
    {
        [Get("/api/v1/VehCatTipoPermiso")]
        Task<ResponseWrapper<PagedResponse<VehCatTipoPermisoDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatTipoPermiso/{id}")]
        Task<ResponseWrapper<VehCatTipoPermisoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatTipoPermiso")]
        Task<ResponseWrapper<VehCatTipoPermisoDto>> CreateAsync([Body] VehCatTipoPermisoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatTipoPermiso")]
        Task<ResponseWrapper<VehCatTipoPermisoDto>> UpdateAsync([Body] VehCatTipoPermisoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatTipoPermiso/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
