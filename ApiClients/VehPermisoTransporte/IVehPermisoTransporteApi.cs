using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPermisoTransporte;
using Refit;

namespace Cavex.Principal.ApiClients.VehPermisoTransporte
{
    public interface IVehPermisoTransporteApi
    {
        [Get("/api/v1/VehPermisoTransporte")]
        Task<ResponseWrapper<PagedResponse<VehPermisoTransporteDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehPermisoTransporte/{id}")]
        Task<ResponseWrapper<VehPermisoTransporteDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehPermisoTransporte")]
        Task<ResponseWrapper<VehPermisoTransporteDto>> CreateAsync([Body] VehPermisoTransporteSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehPermisoTransporte")]
        Task<ResponseWrapper<VehPermisoTransporteDto>> UpdateAsync([Body] VehPermisoTransporteEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehPermisoTransporte/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
