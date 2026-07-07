using Cavex.Principal.ApiClients.VehInfracciones;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehInfracciones;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehInfraccionesService : IVehInfraccionesService
    {
        private readonly IVehInfraccionesApi _vehInfraccionesApi;
        private readonly ILogger<VehInfraccionesService> _logger;

        public VehInfraccionesService(IVehInfraccionesApi vehInfraccionesApi, ILogger<VehInfraccionesService> logger)
        {
            _vehInfraccionesApi = vehInfraccionesApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehInfraccionesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehInfraccionesApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehInfracciones.");

        public Task<ResponseWrapper<VehInfraccionesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehInfraccionesApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehInfracciones.");

        public Task<ResponseWrapper<VehInfraccionesDto>> CrearAsync(VehInfraccionesSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehInfraccionesApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehInfracciones.");

        public Task<ResponseWrapper<VehInfraccionesDto>> EditarAsync(VehInfraccionesEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehInfraccionesApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehInfracciones.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehInfraccionesApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehInfracciones.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehInfracciones.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehInfracciones.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
