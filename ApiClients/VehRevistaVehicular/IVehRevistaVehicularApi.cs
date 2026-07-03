using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRevistaVehicular;
using Refit;

namespace Cavex.Principal.ApiClients.VehRevistaVehicular
{
    public interface IVehRevistaVehicularApi
    {
        [Get("/api/v1/VehRevistaVehicular")]
        Task<ResponseWrapper<PagedResponse<VehRevistaVehicularDto>>> GetAllAsync(CancellationToken cancellationToken = default);

        [Get("/api/v1/VehRevistaVehicular/{id}")]
        Task<ResponseWrapper<VehRevistaVehicularDto>> GetByIdAsync(int id, CancellationToken cancellationToken = default);

        [Post("/api/v1/VehRevistaVehicular")]
        Task<ResponseWrapper<VehRevistaVehicularDto>> CreateAsync([Body] VehRevistaVehicularSaveDto dto, CancellationToken cancellationToken = default);

        [Put("/api/v1/VehRevistaVehicular")]
        Task<ResponseWrapper<VehRevistaVehicularDto>> UpdateAsync([Body] VehRevistaVehicularEditDto dto, CancellationToken cancellationToken = default);

        [Delete("/api/v1/VehRevistaVehicular/{id}")]
        Task<ResponseWrapper<bool>> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
