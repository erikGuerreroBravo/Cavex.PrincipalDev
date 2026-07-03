using Cavex.Principal.ApiClients.VehControlGasolina;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehControlGasolina;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehControlGasolinaService : IVehControlGasolinaService
    {
        private readonly IVehControlGasolinaApi _vehControlGasolinaApi;
        private readonly ILogger<VehControlGasolinaService> _logger;

        public VehControlGasolinaService(IVehControlGasolinaApi vehControlGasolinaApi, ILogger<VehControlGasolinaService> logger)
        {
            _vehControlGasolinaApi = vehControlGasolinaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehControlGasolinaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlGasolinaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehControlGasolina.");

        public Task<ResponseWrapper<VehControlGasolinaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlGasolinaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehControlGasolina.");

        public Task<ResponseWrapper<VehControlGasolinaDto>> CrearAsync(VehControlGasolinaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlGasolinaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehControlGasolina.");

        public Task<ResponseWrapper<VehControlGasolinaDto>> EditarAsync(VehControlGasolinaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlGasolinaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehControlGasolina.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehControlGasolinaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehControlGasolina.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehControlGasolina.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehControlGasolina.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
