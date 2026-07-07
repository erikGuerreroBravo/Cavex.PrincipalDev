using Cavex.Principal.ApiClients.VehCatHolograma;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatHolograma;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatHologramaService : IVehCatHologramaService
    {
        private readonly IVehCatHologramaApi _vehCatHologramaApi;
        private readonly ILogger<VehCatHologramaService> _logger;

        public VehCatHologramaService(IVehCatHologramaApi vehCatHologramaApi, ILogger<VehCatHologramaService> logger)
        {
            _vehCatHologramaApi = vehCatHologramaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatHologramaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatHologramaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatHolograma.");

        public Task<ResponseWrapper<VehCatHologramaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatHologramaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatHolograma.");

        public Task<ResponseWrapper<VehCatHologramaDto>> CrearAsync(VehCatHologramaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatHologramaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatHolograma.");

        public Task<ResponseWrapper<VehCatHologramaDto>> EditarAsync(VehCatHologramaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatHologramaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatHolograma.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatHologramaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatHolograma.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatHolograma.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatHolograma.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
