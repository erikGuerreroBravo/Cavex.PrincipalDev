using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpEmpleado;

namespace Cavex.Principal.Services.Interfaces
{
    public interface IEmpEmpleadoService
    {
        Task<ResponseWrapper<PagedResponse<EmpEmpleadoDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            string? search = null,
            int? status = null,
            CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpEmpleadoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpEmpleadoDto>> CrearAsync(EmpEmpleadoSaveDto request, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<EmpEmpleadoDto>> ActualizarAsync(int id, EmpEmpleadoSaveDto request, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
