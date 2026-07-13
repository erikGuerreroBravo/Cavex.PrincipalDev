using Cavex.Principal.ApiClients.VehCatCapacidad;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatCapacidad;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatCapacidadService : IVehCatCapacidadService
    {
        private readonly IVehCatCapacidadApi _vehCatCapacidadApi;
        private readonly ILogger<VehCatCapacidadService> _logger;

        public VehCatCapacidadService(IVehCatCapacidadApi vehCatCapacidadApi, ILogger<VehCatCapacidadService> logger)
        {
            _vehCatCapacidadApi = vehCatCapacidadApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatCapacidadDto>>> ObtenerTodosAsync([Query] int? pageIndex = null,
            [Query] int? pageSize = null,
            [Query] string? search = null,
            CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatCapacidadApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatCapacidad.");

        public Task<ResponseWrapper<VehCatCapacidadDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatCapacidadApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatCapacidad.");

        public Task<ResponseWrapper<VehCatCapacidadDto>> CrearAsync(VehCatCapacidadSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatCapacidadApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatCapacidad.");

        public Task<ResponseWrapper<VehCatCapacidadDto>> EditarAsync(VehCatCapacidadEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatCapacidadApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatCapacidad.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatCapacidadApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatCapacidad.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatCapacidad.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatCapacidad.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
