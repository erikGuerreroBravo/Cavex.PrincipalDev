using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTarjetaCirculacion;
using Refit;

namespace Cavex.Principal.ApiClients.VehTarjetaCirculacion
{
    public interface IVehTarjetaCirculacionApi
    {
        [Get("/api/v1/VehTarjetaCirculacion")]
        Task<ResponseWrapper<PagedResponse<VehTarjetaCirculacionDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehTarjetaCirculacion/{id}")]
        Task<ResponseWrapper<VehTarjetaCirculacionDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehTarjetaCirculacion")]
        Task<ResponseWrapper<VehTarjetaCirculacionDto>> CreateAsync([Body] VehTarjetaCirculacionSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehTarjetaCirculacion")]
        Task<ResponseWrapper<VehTarjetaCirculacionDto>> UpdateAsync([Body] VehTarjetaCirculacionEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehTarjetaCirculacion/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
