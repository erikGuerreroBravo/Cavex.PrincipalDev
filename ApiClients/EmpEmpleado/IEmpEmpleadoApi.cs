using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpEmpleado;
using Refit;

namespace Cavex.Principal.ApiClients.EmpEmpleado
{
    public interface IEmpEmpleadoApi
    {
        [Get("/api/v1/EmpEmpleado")]
        Task<ResponseWrapper<PagedResponse<EmpEmpleadoDto>>> GetAllAsync(
            [Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            [Query] string? search = null,
            [Query] int? status = null,
            CancellationToken cancellationToken = default);

        [Get("/api/v1/EmpEmpleado/{id}")]
        Task<ResponseWrapper<EmpEmpleadoDto>> GetByIdAsync(int id, CancellationToken cancellationToken);

        [Post("/api/v1/EmpEmpleado")]
        Task<ResponseWrapper<EmpEmpleadoDto>> CreateAsync([Body] RequestWrapper<EmpEmpleadoSaveDto> request, CancellationToken cancellationToken);

        [Put("/api/v1/EmpEmpleado/{id}")]
        Task<ResponseWrapper<EmpEmpleadoDto>> UpdateAsync(int id, [Body] RequestWrapper<EmpEmpleadoSaveDto> request, CancellationToken cancellationToken);

        [Delete("/api/v1/EmpEmpleado/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken);
    }
}
