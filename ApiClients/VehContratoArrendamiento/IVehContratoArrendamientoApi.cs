using Cavex.Principal.Common;
using Cavex.Principal.Models.VehContratoArrendamiento;
using Refit;

namespace Cavex.Principal.ApiClients.VehContratoArrendamiento
{
    public interface IVehContratoArrendamientoApi
    {
        [Get("/api/v1/VehContratoArrendamiento")]
        Task<ResponseWrapper<PagedResponse<VehContratoArrendamientoDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehContratoArrendamiento/{id}")]
        Task<ResponseWrapper<VehContratoArrendamientoDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehContratoArrendamiento")]
        Task<ResponseWrapper<VehContratoArrendamientoDto>> CreateAsync([Body] VehContratoArrendamientoSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehContratoArrendamiento")]
        Task<ResponseWrapper<VehContratoArrendamientoDto>> UpdateAsync([Body] VehContratoArrendamientoEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehContratoArrendamiento/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
