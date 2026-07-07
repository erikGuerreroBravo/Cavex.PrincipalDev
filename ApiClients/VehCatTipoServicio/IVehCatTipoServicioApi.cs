using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoServicio;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatTipoServicio
{
    public interface IVehCatTipoServicioApi
    {
        [Get("/api/v1/VehCatTipoServicio")]
        Task<ResponseWrapper<PagedResponse<VehCatTipoServicioDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatTipoServicio/{id}")]
        Task<ResponseWrapper<VehCatTipoServicioDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatTipoServicio")]
        Task<ResponseWrapper<VehCatTipoServicioDto>> CreateAsync([Body] VehCatTipoServicioSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatTipoServicio")]
        Task<ResponseWrapper<VehCatTipoServicioDto>> UpdateAsync([Body] VehCatTipoServicioEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatTipoServicio/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
