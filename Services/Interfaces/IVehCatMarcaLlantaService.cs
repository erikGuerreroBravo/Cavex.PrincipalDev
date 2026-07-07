using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatMarcaLlanta;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatMarcaLlantaService
    {
        Task<ResponseWrapper<PagedResponse<VehCatMarcaLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaLlantaDto>> CrearAsync(VehCatMarcaLlantaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatMarcaLlantaDto>> EditarAsync(VehCatMarcaLlantaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
