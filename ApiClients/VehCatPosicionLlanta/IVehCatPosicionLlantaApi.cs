using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatPosicionLlanta;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatPosicionLlanta
{
    public interface IVehCatPosicionLlantaApi
    {
        [Get("/api/v1/VehCatPosicionLlanta")]
        Task<ResponseWrapper<PagedResponse<VehCatPosicionLlantaDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatPosicionLlanta/{id}")]
        Task<ResponseWrapper<VehCatPosicionLlantaDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatPosicionLlanta")]
        Task<ResponseWrapper<VehCatPosicionLlantaDto>> CreateAsync([Body] VehCatPosicionLlantaSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatPosicionLlanta")]
        Task<ResponseWrapper<VehCatPosicionLlantaDto>> UpdateAsync([Body] VehCatPosicionLlantaEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatPosicionLlanta/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
