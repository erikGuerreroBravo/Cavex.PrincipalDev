using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatGasolineras;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatGasolinerasService
    {
        Task<ResponseWrapper<PagedResponse<VehCatGasolinerasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatGasolinerasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatGasolinerasDto>> CrearAsync(VehCatGasolinerasSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatGasolinerasDto>> EditarAsync(VehCatGasolinerasEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
