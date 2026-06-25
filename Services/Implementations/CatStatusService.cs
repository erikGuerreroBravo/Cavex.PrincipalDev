using Cavex.Principal.ApiClients.CatStatus;
using Cavex.Principal.Common;
using Cavex.Principal.Models.CatStatus;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class CatStatusService : ICatStatusService
    {
        private readonly ICatStatusApi _catStatusApi;
        private readonly ILogger<CatStatusService> _logger;

        public CatStatusService(ICatStatusApi catStatusApi, ILogger<CatStatusService> logger)
        {
            _catStatusApi = catStatusApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<CatStatusDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _catStatusApi.GetAllAsync(cancellationToken), "No fue posible obtener los estatus.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming CatStatus.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming CatStatus.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
