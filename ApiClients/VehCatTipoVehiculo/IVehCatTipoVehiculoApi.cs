using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoVehiculo;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatTipoVehiculo
{
    public interface IVehCatTipoVehiculoApi
    {
        [Get("/api/v1/VehCatTipoVehiculo")]
        Task<ResponseWrapper<PagedResponse<VehCatTipoVehiculoDto>>> GetAllAsync([Query] int? pageIndex = null,[Query] int? pageSize = null,
            [Query] string? search = null,CancellationToken cancellationToken = default);
        
        [Get("/api/v1/VehCatTipoVehiculo/{id}")]
        Task<ResponseWrapper<VehCatTipoVehiculoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatTipoVehiculo")]
        Task<ResponseWrapper<VehCatTipoVehiculoDto>> CreateAsync([Body] VehCatTipoVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatTipoVehiculo")]
        Task<ResponseWrapper<VehCatTipoVehiculoDto>> UpdateAsync([Body] VehCatTipoVehiculoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatTipoVehiculo/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
