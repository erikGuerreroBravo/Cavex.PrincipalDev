using Cavex.Principal.Common;
using Cavex.Principal.Models.CatStatus;
using Refit;

namespace Cavex.Principal.ApiClients.CatStatus
{
    public interface ICatStatusApi
    {
        [Get("/api/v1/CatStatus")]
        Task<ResponseWrapper<PagedResponse<CatStatusDto>>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
