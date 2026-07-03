using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatCapacidad;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatCapacidadService
    {
        Task<ResponseWrapper<PagedResponse<VehCatCapacidadDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> CrearAsync(VehCatCapacidadSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> EditarAsync(VehCatCapacidadEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
