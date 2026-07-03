using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTarjetaCirculacion;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehTarjetaCirculacionService
    {
        Task<ResponseWrapper<PagedResponse<VehTarjetaCirculacionDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTarjetaCirculacionDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTarjetaCirculacionDto>> CrearAsync(VehTarjetaCirculacionSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehTarjetaCirculacionDto>> EditarAsync(VehTarjetaCirculacionEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
