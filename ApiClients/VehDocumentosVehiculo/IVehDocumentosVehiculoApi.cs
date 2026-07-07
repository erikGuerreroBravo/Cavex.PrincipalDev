using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDocumentosVehiculo;
using Refit;

namespace Cavex.Principal.ApiClients.VehDocumentosVehiculo
{
    public interface IVehDocumentosVehiculoApi
    {
        [Get("/api/v1/VehDocumentosVehiculo")]
        Task<ResponseWrapper<PagedResponse<VehDocumentosVehiculoDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehDocumentosVehiculo/{id}")]
        Task<ResponseWrapper<VehDocumentosVehiculoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehDocumentosVehiculo")]
        Task<ResponseWrapper<VehDocumentosVehiculoDto>> CreateAsync([Body] VehDocumentosVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehDocumentosVehiculo")]
        Task<ResponseWrapper<VehDocumentosVehiculoDto>> UpdateAsync([Body] VehDocumentosVehiculoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehDocumentosVehiculo/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
