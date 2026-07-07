using Cavex.Principal.ApiClients.VehCatTaller;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTaller;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTallerService : IVehCatTallerService
    {
        private readonly IVehCatTallerApi _vehCatTallerApi;
        private readonly ILogger<VehCatTallerService> _logger;

        public VehCatTallerService(IVehCatTallerApi vehCatTallerApi, ILogger<VehCatTallerService> logger)
        {
            _vehCatTallerApi = vehCatTallerApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTallerDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTallerApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTaller.");

        public Task<ResponseWrapper<VehCatTallerDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTallerApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTaller.");

        public Task<ResponseWrapper<VehCatTallerDto>> CrearAsync(VehCatTallerSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTallerApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTaller.");

        public Task<ResponseWrapper<VehCatTallerDto>> EditarAsync(VehCatTallerEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTallerApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTaller.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTallerApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTaller.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTaller.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTaller.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
