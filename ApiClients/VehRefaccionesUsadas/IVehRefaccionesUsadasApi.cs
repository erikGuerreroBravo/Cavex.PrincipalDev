using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRefaccionesUsadas;
using Refit;

namespace Cavex.Principal.ApiClients.VehRefaccionesUsadas
{
    public interface IVehRefaccionesUsadasApi
    {
        [Get("/api/v1/VehRefaccionesUsadas")]
        Task<ResponseWrapper<PagedResponse<VehRefaccionesUsadasDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehRefaccionesUsadas/{id}")]
        Task<ResponseWrapper<VehRefaccionesUsadasDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehRefaccionesUsadas")]
        Task<ResponseWrapper<VehRefaccionesUsadasDto>> CreateAsync([Body] VehRefaccionesUsadasSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehRefaccionesUsadas")]
        Task<ResponseWrapper<VehRefaccionesUsadasDto>> UpdateAsync([Body] VehRefaccionesUsadasEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehRefaccionesUsadas/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
