using Cavex.Principal.ApiClients.VehControlServicio;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlServicio;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehControlServicioService : IVehControlServicioService
    {
        private readonly IVehControlServicioApi _vehControlServicioApi;
        private readonly ILogger<VehControlServicioService> _logger;

        public VehControlServicioService(IVehControlServicioApi vehControlServicioApi, ILogger<VehControlServicioService> logger)
        {
            _vehControlServicioApi = vehControlServicioApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehControlServicioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlServicioApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehControlServicio.");

        public Task<ResponseWrapper<VehControlServicioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlServicioApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehControlServicio.");

        public Task<ResponseWrapper<VehControlServicioDto>> CrearAsync(VehControlServicioSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlServicioApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehControlServicio.");

        public Task<ResponseWrapper<VehControlServicioDto>> EditarAsync(VehControlServicioEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlServicioApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehControlServicio.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlServicioApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehControlServicio.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehControlServicio.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehControlServicio.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
