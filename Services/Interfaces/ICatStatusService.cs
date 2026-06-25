using Cavex.Principal.Common;
using Cavex.Principal.Models.CatStatus;

namespace Cavex.Principal.Services.Interfaces
{
    public interface ICatStatusService
    {
        Task<ResponseWrapper<PagedResponse<CatStatusDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default);
    }
}
