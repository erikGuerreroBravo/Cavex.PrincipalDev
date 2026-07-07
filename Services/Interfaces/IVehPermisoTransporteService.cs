using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPermisoTransporte;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehPermisoTransporteService
    {
        Task<ResponseWrapper<PagedResponse<VehPermisoTransporteDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPermisoTransporteDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPermisoTransporteDto>> CrearAsync(VehPermisoTransporteSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehPermisoTransporteDto>> EditarAsync(VehPermisoTransporteEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
