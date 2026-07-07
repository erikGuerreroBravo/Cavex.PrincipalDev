using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatRefacciones;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatRefacciones
{
    public interface IVehCatRefaccionesApi
    {
        [Get("/api/v1/VehCatRefacciones")]
        Task<ResponseWrapper<PagedResponse<VehCatRefaccionesDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatRefacciones/{id}")]
        Task<ResponseWrapper<VehCatRefaccionesDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatRefacciones")]
        Task<ResponseWrapper<VehCatRefaccionesDto>> CreateAsync([Body] VehCatRefaccionesSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatRefacciones")]
        Task<ResponseWrapper<VehCatRefaccionesDto>> UpdateAsync([Body] VehCatRefaccionesEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatRefacciones/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
