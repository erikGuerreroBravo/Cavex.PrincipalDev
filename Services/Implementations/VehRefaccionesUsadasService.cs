using Cavex.Principal.ApiClients.VehRefaccionesUsadas;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRefaccionesUsadas;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehRefaccionesUsadasService : IVehRefaccionesUsadasService
    {
        private readonly IVehRefaccionesUsadasApi _vehRefaccionesUsadasApi;
        private readonly ILogger<VehRefaccionesUsadasService> _logger;

        public VehRefaccionesUsadasService(IVehRefaccionesUsadasApi vehRefaccionesUsadasApi, ILogger<VehRefaccionesUsadasService> logger)
        {
            _vehRefaccionesUsadasApi = vehRefaccionesUsadasApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehRefaccionesUsadasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRefaccionesUsadasApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehRefaccionesUsadas.");

        public Task<ResponseWrapper<VehRefaccionesUsadasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRefaccionesUsadasApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehRefaccionesUsadas.");

        public Task<ResponseWrapper<VehRefaccionesUsadasDto>> CrearAsync(VehRefaccionesUsadasSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRefaccionesUsadasApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehRefaccionesUsadas.");

        public Task<ResponseWrapper<VehRefaccionesUsadasDto>> EditarAsync(VehRefaccionesUsadasEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRefaccionesUsadasApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehRefaccionesUsadas.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRefaccionesUsadasApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehRefaccionesUsadas.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehRefaccionesUsadas.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehRefaccionesUsadas.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
