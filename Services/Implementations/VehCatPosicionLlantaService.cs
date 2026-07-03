using Cavex.Principal.ApiClients.VehCatPosicionLlanta;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatPosicionLlanta;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatPosicionLlantaService : IVehCatPosicionLlantaService
    {
        private readonly IVehCatPosicionLlantaApi _vehCatPosicionLlantaApi;
        private readonly ILogger<VehCatPosicionLlantaService> _logger;

        public VehCatPosicionLlantaService(IVehCatPosicionLlantaApi vehCatPosicionLlantaApi, ILogger<VehCatPosicionLlantaService> logger)
        {
            _vehCatPosicionLlantaApi = vehCatPosicionLlantaApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatPosicionLlantaDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatPosicionLlantaApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatPosicionLlanta.");

        public Task<ResponseWrapper<VehCatPosicionLlantaDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatPosicionLlantaApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatPosicionLlanta.");

        public Task<ResponseWrapper<VehCatPosicionLlantaDto>> CrearAsync(VehCatPosicionLlantaSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatPosicionLlantaApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatPosicionLlanta.");

        public Task<ResponseWrapper<VehCatPosicionLlantaDto>> EditarAsync(VehCatPosicionLlantaEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatPosicionLlantaApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatPosicionLlanta.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatPosicionLlantaApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatPosicionLlanta.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatPosicionLlanta.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatPosicionLlanta.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
