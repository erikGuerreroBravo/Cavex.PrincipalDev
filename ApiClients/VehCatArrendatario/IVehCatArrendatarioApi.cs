using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatArrendatario;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatArrendatario
{
    public interface IVehCatArrendatarioApi
    {
        [Get("/api/v1/VehCatArrendatario")]
        Task<ResponseWrapper<PagedResponse<VehCatArrendatarioDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatArrendatario/{id}")]
        Task<ResponseWrapper<VehCatArrendatarioDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatArrendatario")]
        Task<ResponseWrapper<VehCatArrendatarioDto>> CreateAsync([Body] VehCatArrendatarioSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatArrendatario")]
        Task<ResponseWrapper<VehCatArrendatarioDto>> UpdateAsync([Body] VehCatArrendatarioEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatArrendatario/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
