using Cavex.Principal.ApiClients.VehPermisoTransporte;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehPermisoTransporte;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehPermisoTransporteService : IVehPermisoTransporteService
    {
        private readonly IVehPermisoTransporteApi _vehPermisoTransporteApi;
        private readonly ILogger<VehPermisoTransporteService> _logger;

        public VehPermisoTransporteService(IVehPermisoTransporteApi vehPermisoTransporteApi, ILogger<VehPermisoTransporteService> logger)
        {
            _vehPermisoTransporteApi = vehPermisoTransporteApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehPermisoTransporteDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPermisoTransporteApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehPermisoTransporte.");

        public Task<ResponseWrapper<VehPermisoTransporteDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPermisoTransporteApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehPermisoTransporte.");

        public Task<ResponseWrapper<VehPermisoTransporteDto>> CrearAsync(VehPermisoTransporteSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPermisoTransporteApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehPermisoTransporte.");

        public Task<ResponseWrapper<VehPermisoTransporteDto>> EditarAsync(VehPermisoTransporteEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPermisoTransporteApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehPermisoTransporte.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehPermisoTransporteApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehPermisoTransporte.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehPermisoTransporte.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehPermisoTransporte.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
