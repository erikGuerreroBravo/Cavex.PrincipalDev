using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatRefacciones;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatRefaccionesService
    {
        Task<ResponseWrapper<PagedResponse<VehCatRefaccionesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatRefaccionesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatRefaccionesDto>> CrearAsync(VehCatRefaccionesSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatRefaccionesDto>> EditarAsync(VehCatRefaccionesEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
