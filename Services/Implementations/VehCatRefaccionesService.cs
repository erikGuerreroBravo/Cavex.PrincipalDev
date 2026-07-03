using Cavex.Principal.ApiClients.VehCatRefacciones;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatRefacciones;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatRefaccionesService : IVehCatRefaccionesService
    {
        private readonly IVehCatRefaccionesApi _vehCatRefaccionesApi;
        private readonly ILogger<VehCatRefaccionesService> _logger;

        public VehCatRefaccionesService(IVehCatRefaccionesApi vehCatRefaccionesApi, ILogger<VehCatRefaccionesService> logger)
        {
            _vehCatRefaccionesApi = vehCatRefaccionesApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatRefaccionesDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatRefaccionesApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatRefacciones.");

        public Task<ResponseWrapper<VehCatRefaccionesDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatRefaccionesApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatRefacciones.");

        public Task<ResponseWrapper<VehCatRefaccionesDto>> CrearAsync(VehCatRefaccionesSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatRefaccionesApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatRefacciones.");

        public Task<ResponseWrapper<VehCatRefaccionesDto>> EditarAsync(VehCatRefaccionesEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatRefaccionesApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatRefacciones.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatRefaccionesApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatRefacciones.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatRefacciones.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatRefacciones.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
