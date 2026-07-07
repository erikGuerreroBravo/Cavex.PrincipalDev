using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatArrendatario;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatArrendatarioService
    {
        Task<ResponseWrapper<PagedResponse<VehCatArrendatarioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatArrendatarioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatArrendatarioDto>> CrearAsync(VehCatArrendatarioSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatArrendatarioDto>> EditarAsync(VehCatArrendatarioEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
