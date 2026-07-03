using Cavex.Principal.ApiClients.VehCatStatus;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatStatus;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatStatusService : IVehCatStatusService
    {
        private readonly IVehCatStatusApi _vehCatStatusApi;
        private readonly ILogger<VehCatStatusService> _logger;

        public VehCatStatusService(IVehCatStatusApi vehCatStatusApi, ILogger<VehCatStatusService> logger)
        {
            _vehCatStatusApi = vehCatStatusApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatStatusDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatStatusApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatStatus.");

        public Task<ResponseWrapper<VehCatStatusDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatStatusApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatStatus.");

        public Task<ResponseWrapper<VehCatStatusDto>> CrearAsync(VehCatStatusSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatStatusApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatStatus.");

        public Task<ResponseWrapper<VehCatStatusDto>> EditarAsync(VehCatStatusEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatStatusApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatStatus.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatStatusApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatStatus.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatStatus.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatStatus.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
