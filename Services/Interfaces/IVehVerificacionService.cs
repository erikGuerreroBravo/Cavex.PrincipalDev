using Cavex.Principal.Common;
using Cavex.Principal.Models.VehVerificacion;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehVerificacionService
    {
        Task<ResponseWrapper<PagedResponse<VehVerificacionDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehVerificacionDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehVerificacionDto>> CrearAsync(VehVerificacionSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehVerificacionDto>> EditarAsync(VehVerificacionEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
