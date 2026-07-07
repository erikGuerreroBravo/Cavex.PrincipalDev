using Cavex.Principal.ApiClients.VehCatTipoPermiso;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoPermiso;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTipoPermisoService : IVehCatTipoPermisoService
    {
        private readonly IVehCatTipoPermisoApi _vehCatTipoPermisoApi;
        private readonly ILogger<VehCatTipoPermisoService> _logger;

        public VehCatTipoPermisoService(IVehCatTipoPermisoApi vehCatTipoPermisoApi, ILogger<VehCatTipoPermisoService> logger)
        {
            _vehCatTipoPermisoApi = vehCatTipoPermisoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTipoPermisoDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoPermisoApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTipoPermiso.");

        public Task<ResponseWrapper<VehCatTipoPermisoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoPermisoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTipoPermiso.");

        public Task<ResponseWrapper<VehCatTipoPermisoDto>> CrearAsync(VehCatTipoPermisoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoPermisoApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTipoPermiso.");

        public Task<ResponseWrapper<VehCatTipoPermisoDto>> EditarAsync(VehCatTipoPermisoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoPermisoApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTipoPermiso.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoPermisoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTipoPermiso.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTipoPermiso.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTipoPermiso.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
