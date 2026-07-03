using Cavex.Principal.ApiClients.VehRevistaVehicular;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehRevistaVehicular;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehRevistaVehicularService : IVehRevistaVehicularService
    {
        private readonly IVehRevistaVehicularApi _vehRevistaVehicularApi;
        private readonly ILogger<VehRevistaVehicularService> _logger;

        public VehRevistaVehicularService(IVehRevistaVehicularApi vehRevistaVehicularApi, ILogger<VehRevistaVehicularService> logger)
        {
            _vehRevistaVehicularApi = vehRevistaVehicularApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehRevistaVehicularDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRevistaVehicularApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehRevistaVehicular.");

        public Task<ResponseWrapper<VehRevistaVehicularDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRevistaVehicularApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehRevistaVehicular.");

        public Task<ResponseWrapper<VehRevistaVehicularDto>> CrearAsync(VehRevistaVehicularSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRevistaVehicularApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehRevistaVehicular.");

        public Task<ResponseWrapper<VehRevistaVehicularDto>> EditarAsync(VehRevistaVehicularEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRevistaVehicularApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehRevistaVehicular.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehRevistaVehicularApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehRevistaVehicular.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehRevistaVehicular.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehRevistaVehicular.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
