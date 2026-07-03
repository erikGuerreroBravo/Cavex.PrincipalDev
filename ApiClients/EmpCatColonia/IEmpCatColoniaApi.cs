using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpCatColonia;
using Refit;

namespace Cavex.Principal.ApiClients.EmpCatColonia
{
    public interface IEmpCatColoniaApi
    {
        [Get("/api/v1/EmpCatColonia")]
        Task<ResponseWrapper<PagedResponse<EmpCatColoniaDto>>> GetAllAsync(
            [Query] int pageIndex,
            [Query] int pageSize,
            [Query] string? search = null,
            CancellationToken cancellationToken = default);

        [Get("/api/v1/EmpCatColonia/{id}")]
        Task<ResponseWrapper<EmpCatColoniaDto>> GetByIdAsync(
            int id,
            CancellationToken cancellationToken = default);
    }
}
