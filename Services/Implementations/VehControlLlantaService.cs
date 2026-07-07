using Cavex.Principal.ApiClients.VehControlLlanta;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlLlanta;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehControlLlantaService : IVehControlLlantaService
    {
        private readonly IVehControlLlantaApi _vehControlLlantaApi;
        private readonly ILogger<VehControlLlantaService> _logger;

        public VehControlLlantaService(IVehControlLlantaApi vehControlLlantaApi, ILogger<VehControlLlantaService> logger)
        {
            _vehControlLlantaApi = vehControlLlantaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehControlLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlLlantaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehControlLlanta.");

        public Task<ResponseWrapper<VehControlLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlLlantaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehControlLlanta.");

        public Task<ResponseWrapper<VehControlLlantaDto>> CrearAsync(VehControlLlantaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlLlantaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehControlLlanta.");

        public Task<ResponseWrapper<VehControlLlantaDto>> EditarAsync(VehControlLlantaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlLlantaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehControlLlanta.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlLlantaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehControlLlanta.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehControlLlanta.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehControlLlanta.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
