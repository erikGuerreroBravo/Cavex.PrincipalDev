using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRefaccionesUsadas;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehRefaccionesUsadasService
    {
        Task<ResponseWrapper<PagedResponse<VehRefaccionesUsadasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRefaccionesUsadasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRefaccionesUsadasDto>> CrearAsync(VehRefaccionesUsadasSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRefaccionesUsadasDto>> EditarAsync(VehRefaccionesUsadasEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
