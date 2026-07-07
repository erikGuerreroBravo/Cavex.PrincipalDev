using Cavex.Principal.Common;
using Cavex.Principal.Models.VehContratoArrendamiento;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehContratoArrendamientoService
    {
        Task<ResponseWrapper<PagedResponse<VehContratoArrendamientoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehContratoArrendamientoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehContratoArrendamientoDto>> CrearAsync(VehContratoArrendamientoSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehContratoArrendamientoDto>> EditarAsync(VehContratoArrendamientoEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
