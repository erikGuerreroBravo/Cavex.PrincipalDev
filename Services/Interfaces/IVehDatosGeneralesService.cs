using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDatosGenerales;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehDatosGeneralesService
    {
        Task<ResponseWrapper<PagedResponse<VehDatosGeneralesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDatosGeneralesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDatosGeneralesDto>> CrearAsync(VehDatosGeneralesSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDatosGeneralesDto>> EditarAsync(VehDatosGeneralesEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
