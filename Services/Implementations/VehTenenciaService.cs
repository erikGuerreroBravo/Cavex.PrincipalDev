using Cavex.Principal.ApiClients.VehTenencia;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehTenencia;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehTenenciaService : IVehTenenciaService
    {
        private readonly IVehTenenciaApi _vehTenenciaApi;
        private readonly ILogger<VehTenenciaService> _logger;

        public VehTenenciaService(IVehTenenciaApi vehTenenciaApi, ILogger<VehTenenciaService> logger)
        {
            _vehTenenciaApi = vehTenenciaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehTenenciaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTenenciaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehTenencia.");

        public Task<ResponseWrapper<VehTenenciaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTenenciaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehTenencia.");

        public Task<ResponseWrapper<VehTenenciaDto>> CrearAsync(VehTenenciaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTenenciaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehTenencia.");

        public Task<ResponseWrapper<VehTenenciaDto>> EditarAsync(VehTenenciaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTenenciaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehTenencia.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehTenenciaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehTenencia.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehTenencia.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehTenencia.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
