using Cavex.Principal.Common;
using Cavex.Principal.Models.VehSeguro;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehSeguroService
    {
        Task<ResponseWrapper<PagedResponse<VehSeguroDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehSeguroDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehSeguroDto>> CrearAsync(VehSeguroSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehSeguroDto>> EditarAsync(VehSeguroEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
