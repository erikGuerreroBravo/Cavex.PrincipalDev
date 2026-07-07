using Cavex.Principal.ApiClients.VehPlacas;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPlacas;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehPlacasService : IVehPlacasService
    {
        private readonly IVehPlacasApi _vehPlacasApi;
        private readonly ILogger<VehPlacasService> _logger;

        public VehPlacasService(IVehPlacasApi vehPlacasApi, ILogger<VehPlacasService> logger)
        {
            _vehPlacasApi = vehPlacasApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehPlacasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPlacasApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehPlacas.");

        public Task<ResponseWrapper<VehPlacasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPlacasApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehPlacas.");

        public Task<ResponseWrapper<VehPlacasDto>> CrearAsync(VehPlacasSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPlacasApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehPlacas.");

        public Task<ResponseWrapper<VehPlacasDto>> EditarAsync(VehPlacasEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPlacasApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehPlacas.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPlacasApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehPlacas.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehPlacas.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehPlacas.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
