using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRevistaVehicular;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IVehRevistaVehicularService
    {
        Task<ResponseWrapper<PagedResponse<VehRevistaVehicularDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRevistaVehicularDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRevistaVehicularDto>> CrearAsync(VehRevistaVehicularSaveDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<VehRevistaVehicularDto>> EditarAsync(VehRevistaVehicularEditDto dto, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
