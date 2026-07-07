using Cavex.Principal.ApiClients.VehDocumentosVehiculo;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDocumentosVehiculo;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehDocumentosVehiculoService : IVehDocumentosVehiculoService
    {
        private readonly IVehDocumentosVehiculoApi _vehDocumentosVehiculoApi;
        private readonly ILogger<VehDocumentosVehiculoService> _logger;

        public VehDocumentosVehiculoService(IVehDocumentosVehiculoApi vehDocumentosVehiculoApi, ILogger<VehDocumentosVehiculoService> logger)
        {
            _vehDocumentosVehiculoApi = vehDocumentosVehiculoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehDocumentosVehiculoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDocumentosVehiculoApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehDocumentosVehiculo.");

        public Task<ResponseWrapper<VehDocumentosVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDocumentosVehiculoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehDocumentosVehiculo.");

        public Task<ResponseWrapper<VehDocumentosVehiculoDto>> CrearAsync(VehDocumentosVehiculoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDocumentosVehiculoApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehDocumentosVehiculo.");

        public Task<ResponseWrapper<VehDocumentosVehiculoDto>> EditarAsync(VehDocumentosVehiculoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDocumentosVehiculoApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehDocumentosVehiculo.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDocumentosVehiculoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehDocumentosVehiculo.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehDocumentosVehiculo.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehDocumentosVehiculo.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
