using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDocumentosVehiculo;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehDocumentosVehiculoService
    {
        Task<ResponseWrapper<PagedResponse<VehDocumentosVehiculoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDocumentosVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDocumentosVehiculoDto>> CrearAsync(VehDocumentosVehiculoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehDocumentosVehiculoDto>> EditarAsync(VehDocumentosVehiculoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
