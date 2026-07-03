using Cavex.Principal.Common;
using Cavex.Principal.Models.VehVerificacion;
using Refit;

namespace Cavex.Principal.ApiClients.VehVerificacion
{
    public interface IVehVerificacionApi
    {
        [Get("/api/v1/VehVerificacion")]
        Task<ResponseWrapper<PagedResponse<VehVerificacionDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehVerificacion/{id}")]
        Task<ResponseWrapper<VehVerificacionDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehVerificacion")]
        Task<ResponseWrapper<VehVerificacionDto>> CreateAsync([Body] VehVerificacionSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehVerificacion")]
        Task<ResponseWrapper<VehVerificacionDto>> UpdateAsync([Body] VehVerificacionEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehVerificacion/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
