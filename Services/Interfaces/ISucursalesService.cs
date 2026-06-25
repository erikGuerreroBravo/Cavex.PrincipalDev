using Cavex.Principal.Common;
using Cavex.Principal.Models.CatSucursal;

namespace Cavex.Principal.Services.Interfaces
{
    public interface ISucursalesService
    {
        Task<ResponseWrapper<PagedResponse<CatSucursalDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);
        Task<ResponseWrapper<CatSucursalDto>> CrearAsync(CatSucursalSaveDto request, CancellationToken cancellationToken = default);
        Task<ResponseWrapper<CatSucursalDto>> ActualizarAsync(int id, CatSucursalSaveDto request, CancellationToken cancellationToken = default);
        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}