using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatResponsableServicio;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatResponsableServicioService
    {
        Task<ResponseWrapper<PagedResponse<VehCatResponsableServicioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatResponsableServicioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatResponsableServicioDto>> CrearAsync(VehCatResponsableServicioSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatResponsableServicioDto>> EditarAsync(VehCatResponsableServicioEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
