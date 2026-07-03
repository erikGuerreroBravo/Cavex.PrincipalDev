using Cavex.Principal.ApiClients.CatStatus;
using Cavex.Principal.ApiClients.VehCatGasolineras;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatGasolineras;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatGasolinerasService : IVehCatGasolinerasService
    {
        private readonly IVehCatGasolinerasApi _vehCatGasolinerasApi;
        private readonly ILogger<VehCatGasolinerasService> _logger;

        public VehCatGasolinerasService(IVehCatGasolinerasApi vehCatGasolinerasApi, ILogger<VehCatGasolinerasService> logger)
        {
            _vehCatGasolinerasApi = vehCatGasolinerasApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatGasolinerasDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatGasolinerasApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatGasolineras.");

        public Task<ResponseWrapper<VehCatGasolinerasDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatGasolinerasApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatGasolineras.");

        public Task<ResponseWrapper<VehCatGasolinerasDto>> CrearAsync(VehCatGasolinerasSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatGasolinerasApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatGasolineras.");

        public Task<ResponseWrapper<VehCatGasolinerasDto>> EditarAsync(VehCatGasolinerasEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatGasolinerasApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatGasolineras.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatGasolinerasApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatGasolineras.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatGasolineras.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatGasolineras.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
