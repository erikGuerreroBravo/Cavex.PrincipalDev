using Cavex.Principal.ApiClients.VehCatTipoCombustible;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCombustible;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTipoCombustibleService : IVehCatTipoCombustibleService
    {
        private readonly IVehCatTipoCombustibleApi _vehCatTipoCombustibleApi;
        private readonly ILogger<VehCatTipoCombustibleService> _logger;

        public VehCatTipoCombustibleService(IVehCatTipoCombustibleApi vehCatTipoCombustibleApi, ILogger<VehCatTipoCombustibleService> logger)
        {
            _vehCatTipoCombustibleApi = vehCatTipoCombustibleApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTipoCombustibleDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCombustibleApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTipoCombustible.");

        public Task<ResponseWrapper<VehCatTipoCombustibleDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCombustibleApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTipoCombustible.");

        public Task<ResponseWrapper<VehCatTipoCombustibleDto>> CrearAsync(VehCatTipoCombustibleSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCombustibleApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTipoCombustible.");

        public Task<ResponseWrapper<VehCatTipoCombustibleDto>> EditarAsync(VehCatTipoCombustibleEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCombustibleApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTipoCombustible.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCombustibleApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTipoCombustible.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTipoCombustible.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTipoCombustible.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
