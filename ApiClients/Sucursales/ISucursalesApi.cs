using Cavex.Principal.Common;
using Cavex.Principal.Models.CatSucursal;
using Refit;

namespace Cavex.Principal.ApiClients.Sucursales
{
    public interface ISucursalesApi
    {
        [Get("/api/v1/CatSucursales")]
        Task<ResponseWrapper<PagedResponse<CatSucursalDto>>> GetAllAsync(
            [Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            CancellationToken cancellationToken = default);

        [Post("/api/v1/CatSucursales")]
        Task<ResponseWrapper<CatSucursalDto>> CreateAsync([Body] RequestWrapper<CatSucursalSaveDto> request, CancellationToken cancellationToken = default);

        [Put("/api/v1/CatSucursales/{id}")]
        Task<ResponseWrapper<CatSucursalDto>> UpdateAsync(int id, [Body] RequestWrapper<CatSucursalSaveDto> request, CancellationToken cancellationToken = default);

        [Delete("/api/v1/CatSucursales/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}