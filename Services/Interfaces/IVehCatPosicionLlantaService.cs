using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatPosicionLlanta;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatPosicionLlantaService
    {
        Task<ResponseWrapper<PagedResponse<VehCatPosicionLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatPosicionLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatPosicionLlantaDto>> CrearAsync(VehCatPosicionLlantaSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatPosicionLlantaDto>> EditarAsync(VehCatPosicionLlantaEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
