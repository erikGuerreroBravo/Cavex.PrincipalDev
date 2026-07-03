using Cavex.Principal.ApiClients.VehVerificacion;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehVerificacion;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehVerificacionService : IVehVerificacionService
    {
        private readonly IVehVerificacionApi _vehVerificacionApi;
        private readonly ILogger<VehVerificacionService> _logger;

        public VehVerificacionService(IVehVerificacionApi vehVerificacionApi, ILogger<VehVerificacionService> logger)
        {
            _vehVerificacionApi = vehVerificacionApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehVerificacionDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehVerificacionApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehVerificacion.");

        public Task<ResponseWrapper<VehVerificacionDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehVerificacionApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehVerificacion.");

        public Task<ResponseWrapper<VehVerificacionDto>> CrearAsync(VehVerificacionSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehVerificacionApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehVerificacion.");

        public Task<ResponseWrapper<VehVerificacionDto>> EditarAsync(VehVerificacionEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehVerificacionApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehVerificacion.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehVerificacionApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehVerificacion.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehVerificacion.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehVerificacion.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
