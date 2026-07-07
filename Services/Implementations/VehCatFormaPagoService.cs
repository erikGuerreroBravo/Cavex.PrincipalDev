using Cavex.Principal.ApiClients.VehCatFormaPago;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatFormaPago;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatFormaPagoService : IVehCatFormaPagoService
    {
        private readonly IVehCatFormaPagoApi _vehCatFormaPagoApi;
        private readonly ILogger<VehCatFormaPagoService> _logger;

        public VehCatFormaPagoService(IVehCatFormaPagoApi vehCatFormaPagoApi, ILogger<VehCatFormaPagoService> logger)
        {
            _vehCatFormaPagoApi = vehCatFormaPagoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatFormaPagoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatFormaPagoApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatFormaPago.");

        public Task<ResponseWrapper<VehCatFormaPagoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatFormaPagoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatFormaPago.");

        public Task<ResponseWrapper<VehCatFormaPagoDto>> CrearAsync(VehCatFormaPagoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatFormaPagoApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatFormaPago.");

        public Task<ResponseWrapper<VehCatFormaPagoDto>> EditarAsync(VehCatFormaPagoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatFormaPagoApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatFormaPago.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatFormaPagoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatFormaPago.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatFormaPago.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatFormaPago.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
