using Cavex.Principal.ApiClients.VehDaniosAccidentes;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehDaniosAccidentes;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehDaniosAccidentesService : IVehDaniosAccidentesService
    {
        private readonly IVehDaniosAccidentesApi _vehDaniosAccidentesApi;
        private readonly ILogger<VehDaniosAccidentesService> _logger;

        public VehDaniosAccidentesService(IVehDaniosAccidentesApi vehDaniosAccidentesApi, ILogger<VehDaniosAccidentesService> logger)
        {
            _vehDaniosAccidentesApi = vehDaniosAccidentesApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehDaniosAccidentesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDaniosAccidentesApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehDaniosAccidentes.");

        public Task<ResponseWrapper<VehDaniosAccidentesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDaniosAccidentesApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehDaniosAccidentes.");

        public Task<ResponseWrapper<VehDaniosAccidentesDto>> CrearAsync(VehDaniosAccidentesSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDaniosAccidentesApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehDaniosAccidentes.");

        public Task<ResponseWrapper<VehDaniosAccidentesDto>> EditarAsync(VehDaniosAccidentesEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDaniosAccidentesApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehDaniosAccidentes.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehDaniosAccidentesApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehDaniosAccidentes.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehDaniosAccidentes.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehDaniosAccidentes.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
