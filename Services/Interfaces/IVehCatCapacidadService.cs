using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatCapacidad;
using Refit;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatCapacidadService
    {
        Task<ResponseWrapper<PagedResponse<VehCatCapacidadDto>>> ObtenerTodosAsync([Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            [Query] string? search = null,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> CrearAsync(VehCatCapacidadSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatCapacidadDto>> EditarAsync(VehCatCapacidadEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
