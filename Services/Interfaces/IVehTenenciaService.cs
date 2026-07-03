using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTenencia;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehTenenciaService
    {
        Task<ResponseWrapper<PagedResponse<VehTenenciaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTenenciaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTenenciaDto>> CrearAsync(VehTenenciaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTenenciaDto>> EditarAsync(VehTenenciaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
