using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatAseguradora;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatAseguradoraService
    {
        Task<ResponseWrapper<PagedResponse<VehCatAseguradoraDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatAseguradoraDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatAseguradoraDto>> CrearAsync(VehCatAseguradoraSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatAseguradoraDto>> EditarAsync(VehCatAseguradoraEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
