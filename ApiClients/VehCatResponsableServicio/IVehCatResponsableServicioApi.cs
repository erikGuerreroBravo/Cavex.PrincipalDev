using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatResponsableServicio;
using Refit;

namespace Cavex.Principal.ApiClients.VehCatResponsableServicio
{
    public interface IVehCatResponsableServicioApi
    {
        [Get("/api/v1/VehCatResponsableServicio")]
        Task<ResponseWrapper<PagedResponse<VehCatResponsableServicioDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehCatResponsableServicio/{id}")]
        Task<ResponseWrapper<VehCatResponsableServicioDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehCatResponsableServicio")]
        Task<ResponseWrapper<VehCatResponsableServicioDto>> CreateAsync([Body] VehCatResponsableServicioSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehCatResponsableServicio")]
        Task<ResponseWrapper<VehCatResponsableServicioDto>> UpdateAsync([Body] VehCatResponsableServicioEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehCatResponsableServicio/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
