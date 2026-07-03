using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCombustible;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehCatTipoCombustibleService
    {
        Task<ResponseWrapper<PagedResponse<VehCatTipoCombustibleDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCombustibleDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCombustibleDto>> CrearAsync(VehCatTipoCombustibleSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehCatTipoCombustibleDto>> EditarAsync(VehCatTipoCombustibleEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
