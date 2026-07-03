using Cavex.Principal.ApiClients.VehCatTipoCobertura;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatTipoCoberura;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatTipoCoberturaService : IVehCatTipoCoberturaService
    {
        private readonly IVehCatTipoCoberturaApi _vehCatTipoCoberturaApi;
        private readonly ILogger<VehCatTipoCoberturaService> _logger;

        public VehCatTipoCoberturaService(IVehCatTipoCoberturaApi vehCatTipoCoberturaApi, ILogger<VehCatTipoCoberturaService> logger)
        {
            _vehCatTipoCoberturaApi = vehCatTipoCoberturaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatTipoCoberturaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCoberturaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatTipoCobertura.");

        public Task<ResponseWrapper<VehCatTipoCoberturaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCoberturaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatTipoCobertura.");

        public Task<ResponseWrapper<VehCatTipoCoberturaDto>> CrearAsync(VehCatTipoCoberturaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCoberturaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatTipoCobertura.");

        public Task<ResponseWrapper<VehCatTipoCoberturaDto>> EditarAsync(VehCatTipoCoberturaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCoberturaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatTipoCobertura.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatTipoCoberturaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatTipoCobertura.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatTipoCobertura.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatTipoCobertura.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
