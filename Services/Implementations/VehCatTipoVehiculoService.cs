using Cavex.Principal.ApiClients.VehCatTipoVehiculo;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoVehiculo;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTipoVehiculoService : IVehCatTipoVehiculoService
    {
        private readonly IVehCatTipoVehiculoApi _vehCatTipoVehiculoApi;
        private readonly ILogger<VehCatTipoVehiculoService> _logger;

        public VehCatTipoVehiculoService(IVehCatTipoVehiculoApi vehCatTipoVehiculoApi, ILogger<VehCatTipoVehiculoService> logger)
        {
            _vehCatTipoVehiculoApi = vehCatTipoVehiculoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTipoVehiculoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoVehiculoApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTipoVehiculo.");

        public Task<ResponseWrapper<VehCatTipoVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoVehiculoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTipoVehiculo.");

        public Task<ResponseWrapper<VehCatTipoVehiculoDto>> CrearAsync(VehCatTipoVehiculoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoVehiculoApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTipoVehiculo.");

        public Task<ResponseWrapper<VehCatTipoVehiculoDto>> EditarAsync(VehCatTipoVehiculoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoVehiculoApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTipoVehiculo.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoVehiculoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTipoVehiculo.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTipoVehiculo.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTipoVehiculo.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
