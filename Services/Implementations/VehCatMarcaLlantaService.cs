using Cavex.Principal.ApiClients.VehCatMarcaLlanta;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatMarcaLlanta;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatMarcaLlantaService : IVehCatMarcaLlantaService
    {
        private readonly IVehCatMarcaLlantaApi _vehCatMarcaLlantaApi;
        private readonly ILogger<VehCatMarcaLlantaService> _logger;

        public VehCatMarcaLlantaService(IVehCatMarcaLlantaApi vehCatMarcaLlantaApi, ILogger<VehCatMarcaLlantaService> logger)
        {
            _vehCatMarcaLlantaApi = vehCatMarcaLlantaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatMarcaLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaLlantaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatMarcaLlanta.");

        public Task<ResponseWrapper<VehCatMarcaLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaLlantaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatMarcaLlanta.");

        public Task<ResponseWrapper<VehCatMarcaLlantaDto>> CrearAsync(VehCatMarcaLlantaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaLlantaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatMarcaLlanta.");

        public Task<ResponseWrapper<VehCatMarcaLlantaDto>> EditarAsync(VehCatMarcaLlantaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaLlantaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatMarcaLlanta.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaLlantaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatMarcaLlanta.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatMarcaLlanta.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatMarcaLlanta.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
