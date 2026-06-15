using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpCatAreaLaboral;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IEmpCatAreaLaboralService
    {
        Task<ResponseWrapper<PagedResponse<EmpCatAreaLaboralDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpCatAreaLaboralDto>> ObtenerPorIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpCatAreaLaboralDto>> CrearAsync(
            EmpCatAreaLaboralSaveDto request,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpCatAreaLaboralDto>> ActualizarAsync(
            int id,
            EmpCatAreaLaboralSaveDto request,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(
            int id,
            CancellationToken cancellationToken = default);
    }
}
