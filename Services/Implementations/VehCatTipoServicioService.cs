using Cavex.Principal.ApiClients.VehCatTipoServicio;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoServicio;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTipoServicioService : IVehCatTipoServicioService
    {
        private readonly IVehCatTipoServicioApi _vehCatTipoServicioApi;
        private readonly ILogger<VehCatTipoServicioService> _logger;

        public VehCatTipoServicioService(IVehCatTipoServicioApi vehCatTipoServicioApi, ILogger<VehCatTipoServicioService> logger)
        {
            _vehCatTipoServicioApi = vehCatTipoServicioApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTipoServicioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoServicioApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTipoServicio.");

        public Task<ResponseWrapper<VehCatTipoServicioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoServicioApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTipoServicio.");

        public Task<ResponseWrapper<VehCatTipoServicioDto>> CrearAsync(VehCatTipoServicioSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoServicioApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTipoServicio.");

        public Task<ResponseWrapper<VehCatTipoServicioDto>> EditarAsync(VehCatTipoServicioEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoServicioApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTipoServicio.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoServicioApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTipoServicio.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTipoServicio.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTipoServicio.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
