using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatMarcaVehiculo
{
    public interface IVehCatMarcaVehiculoApi
    {
        [Get("/api/v1/VehCatMarcaVehiculo")]
        Task<ResponseWrapper<PagedResponse<VehCatMarcaVehiculoDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatMarcaVehiculo/{id}")]
        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatMarcaVehiculo")]
        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> CreateAsync([Body] VehCatMarcaVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatMarcaVehiculo")]
        Task<ResponseWrapper<VehCatMarcaVehiculoDto>> UpdateAsync([Body] VehCatMarcaVehiculoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatMarcaVehiculo/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
