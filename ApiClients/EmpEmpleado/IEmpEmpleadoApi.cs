using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpEmpleado;
using Refit;

namespace Cavex.Principal.ApiClients.EmpEmpleado
{
    public interface IEmpEmpleadoApi
    {
        [Get("/api/emp-empleado")]
        Task<ResponseWrapper<PagedResponse<EmpEmpleadoDto>>> GetAllAsync(CancellationToken cancellationToken);

        [Get("/api/emp-empleado/{id}")]
        Task<ResponseWrapper<EmpEmpleadoDto>> GetByIdAsync(int id, CancellationToken cancellationToken);

        [Post("/api/emp-empleado")]
        Task<ResponseWrapper<EmpEmpleadoDto>> CreateAsync([Body] RequestWrapper<EmpEmpleadoSaveDto> request, CancellationToken cancellationToken);

        [Put("/api/emp-empleado/{id}")]
        Task<ResponseWrapper<EmpEmpleadoDto>> UpdateAsync(int id, [Body] RequestWrapper<EmpEmpleadoSaveDto> request, CancellationToken cancellationToken);

        [Delete("/api/emp-empleado/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken);
    }
}
