using Cavex.Principal.ApiClients.VehSeguro;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehSeguro;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehSeguroService : IVehSeguroService
    {
        private readonly IVehSeguroApi _vehSeguroApi;
        private readonly ILogger<VehSeguroService> _logger;

        public VehSeguroService(IVehSeguroApi vehSeguroApi, ILogger<VehSeguroService> logger)
        {
            _vehSeguroApi = vehSeguroApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehSeguroDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehSeguroApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehSeguro.");

        public Task<ResponseWrapper<VehSeguroDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehSeguroApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehSeguro.");

        public Task<ResponseWrapper<VehSeguroDto>> CrearAsync(VehSeguroSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehSeguroApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehSeguro.");

        public Task<ResponseWrapper<VehSeguroDto>> EditarAsync(VehSeguroEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehSeguroApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehSeguro.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehSeguroApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehSeguro.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehSeguro.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehSeguro.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
