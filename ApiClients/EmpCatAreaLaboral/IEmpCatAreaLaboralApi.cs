using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpCatAreaLaboral;
using Refit;

namespace Cavex.Principal.ApiClients.EmpCatAreaLaboral
{
    public interface IEmpCatAreaLaboralApi
    {
        [Get("/api/v1/EmpCatAreaLaboral")]
        Task<ResponseWrapper<PagedResponse<EmpCatAreaLaboralDto>>> GetAllAsync(
            [Body] RequestWrapper<EmpCatAreaLaboralQueryDto> request,
            CancellationToken cancellationToken = default);

        [Get("/api/v1/EmpCatAreaLaboral/{id}")]
        Task<ResponseWrapper<EmpCatAreaLaboralDto>> GetByIdAsync(
            int id,
            [Body] RequestWrapper<int> request,
            CancellationToken cancellationToken = default);

        [Post("/api/v1/EmpCatAreaLaboral")]
        Task<ResponseWrapper<EmpCatAreaLaboralDto>> CreateAsync(
            [Body] RequestWrapper<EmpCatAreaLaboralSaveDto> request,
            CancellationToken cancellationToken = default);

        [Put("/api/v1/EmpCatAreaLaboral/{id}")]
        Task<ResponseWrapper<EmpCatAreaLaboralDto>> UpdateAsync(
            int id,
            [Body] RequestWrapper<EmpCatAreaLaboralSaveDto> request,
            CancellationToken cancellationToken = default);

        [Delete("/api/v1/EmpCatAreaLaboral/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(
            int id,
            [Body] RequestWrapper<int> request,
            CancellationToken cancellationToken = default);
    }
}
