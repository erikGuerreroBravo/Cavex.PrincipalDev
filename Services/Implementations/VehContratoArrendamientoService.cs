using Cavex.Principal.ApiClients.VehContratoArrendamiento;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehContratoArrendamiento;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehContratoArrendamientoService : IVehContratoArrendamientoService
    {
        private readonly IVehContratoArrendamientoApi _vehContratoArrendamientoApi;
        private readonly ILogger<VehContratoArrendamientoService> _logger;

        public VehContratoArrendamientoService(IVehContratoArrendamientoApi vehContratoArrendamientoApi, ILogger<VehContratoArrendamientoService> logger)
        {
            _vehContratoArrendamientoApi = vehContratoArrendamientoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehContratoArrendamientoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehContratoArrendamientoApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehContratoArrendamiento.");

        public Task<ResponseWrapper<VehContratoArrendamientoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehContratoArrendamientoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehContratoArrendamiento.");

        public Task<ResponseWrapper<VehContratoArrendamientoDto>> CrearAsync(VehContratoArrendamientoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehContratoArrendamientoApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehContratoArrendamiento.");

        public Task<ResponseWrapper<VehContratoArrendamientoDto>> EditarAsync(VehContratoArrendamientoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehContratoArrendamientoApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehContratoArrendamiento.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehContratoArrendamientoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehContratoArrendamiento.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehContratoArrendamiento.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehContratoArrendamiento.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
