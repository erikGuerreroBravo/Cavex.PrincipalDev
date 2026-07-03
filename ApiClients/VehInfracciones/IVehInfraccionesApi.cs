using Cavex.Principal.Common;
using Cavex.Principal.Models.VehInfracciones;
using Refit;

namespace Cavex.Principal.ApiClients.VehInfracciones
{
    public interface IVehInfraccionesApi
    {
        [Get("/api/v1/VehInfracciones")]
        Task<ResponseWrapper<PagedResponse<VehInfraccionesDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehInfracciones/{id}")]
        Task<ResponseWrapper<VehInfraccionesDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehInfracciones")]
        Task<ResponseWrapper<VehInfraccionesDto>> CreateAsync([Body] VehInfraccionesSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehInfracciones")]
        Task<ResponseWrapper<VehInfraccionesDto>> UpdateAsync([Body] VehInfraccionesEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehInfracciones/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
