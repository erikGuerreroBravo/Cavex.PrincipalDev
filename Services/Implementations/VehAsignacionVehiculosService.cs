using Cavex.Principal.ApiClients.CatStatus;
using Cavex.Principal.Models.CatStatus;
using Cavex.Principal.Models.CatServicio;
using Cavex.Principal.ApiClients.VehAsignacionVehiculos;
using Cavex.Principal.Models.VehAsignacionVehiculos;
using Cavex.Principal.Common;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehAsignacionVehiculosService : IVehAsignacionVehiculosService
    {
        private readonly IVehAsignacionVehiculosApi _vehAsignacionVehiculosApi;
        private readonly ILogger<VehAsignacionVehiculosService> _logger;

        public VehAsignacionVehiculosService(IVehAsignacionVehiculosApi vehAsignacionVehiculosApi, ILogger<VehAsignacionVehiculosService> logger)
        {
            _vehAsignacionVehiculosApi = vehAsignacionVehiculosApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehAsignacionVehiculosDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehAsignacionVehiculosApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehAsignacionVehiculos.");

        public Task<ResponseWrapper<VehAsignacionVehiculosDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehAsignacionVehiculosApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehAsignacionVehiculos.");

        public Task<ResponseWrapper<VehAsignacionVehiculosDto>> CrearAsync(VehAsignacionVehiculosSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehAsignacionVehiculosApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehAsignacionVehiculos.");

        public Task<ResponseWrapper<VehAsignacionVehiculosDto>> EditarAsync(VehAsignacionVehiculosEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehAsignacionVehiculosApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehAsignacionVehiculos.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehAsignacionVehiculosApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehAsignacionVehiculos.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehAsignacionVehiculos.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehAsignacionVehiculos.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
