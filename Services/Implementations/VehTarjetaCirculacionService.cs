using Cavex.Principal.ApiClients.VehTarjetaCirculacion;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTarjetaCirculacion;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehTarjetaCirculacionService : IVehTarjetaCirculacionService
    {
        private readonly IVehTarjetaCirculacionApi _vehTarjetaCirculacionApi;
        private readonly ILogger<VehTarjetaCirculacionService> _logger;

        public VehTarjetaCirculacionService(IVehTarjetaCirculacionApi vehTarjetaCirculacionApi, ILogger<VehTarjetaCirculacionService> logger)
        {
            _vehTarjetaCirculacionApi = vehTarjetaCirculacionApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehTarjetaCirculacionDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTarjetaCirculacionApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehTarjetaCirculacion.");

        public Task<ResponseWrapper<VehTarjetaCirculacionDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTarjetaCirculacionApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehTarjetaCirculacion.");

        public Task<ResponseWrapper<VehTarjetaCirculacionDto>> CrearAsync(VehTarjetaCirculacionSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTarjetaCirculacionApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehTarjetaCirculacion.");

        public Task<ResponseWrapper<VehTarjetaCirculacionDto>> EditarAsync(VehTarjetaCirculacionEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTarjetaCirculacionApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehTarjetaCirculacion.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTarjetaCirculacionApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehTarjetaCirculacion.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehTarjetaCirculacion.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehTarjetaCirculacion.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
