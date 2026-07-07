using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatCapacidad;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatCapacidad
{
    public interface IVehCatCapacidadApi
    {
        [Get("/api/v1/VehCatCapacidad")]
        Task<ResponseWrapper<PagedResponse<VehCatCapacidadDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatCapacidad/{id}")]
        Task<ResponseWrapper<VehCatCapacidadDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatCapacidad")]
        Task<ResponseWrapper<VehCatCapacidadDto>> CreateAsync([Body] VehCatCapacidadSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatCapacidad")]
        Task<ResponseWrapper<VehCatCapacidadDto>> UpdateAsync([Body] VehCatCapacidadEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatCapacidad/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
