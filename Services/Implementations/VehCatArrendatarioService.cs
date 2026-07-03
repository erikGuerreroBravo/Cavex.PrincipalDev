using Cavex.Principal.ApiClients.VehCatArrendatario;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatArrendatario;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatArrendatarioService : IVehCatArrendatarioService
    {
        private readonly IVehCatArrendatarioApi _vehCatArrendatarioApi;
        private readonly ILogger<VehCatArrendatarioService> _logger;

        public VehCatArrendatarioService(IVehCatArrendatarioApi vehCatArrendatarioApi, ILogger<VehCatArrendatarioService> logger)
        {
            _vehCatArrendatarioApi = vehCatArrendatarioApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatArrendatarioDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatArrendatarioApi.GetAllAsync(cancellationToken), "No fue posible obtener los registros de VehCatArrendatario.");

        public Task<ResponseWrapper<VehCatArrendatarioDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatArrendatarioApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatArrendatario.");

        public Task<ResponseWrapper<VehCatArrendatarioDto>> CrearAsync(VehCatArrendatarioSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatArrendatarioApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatArrendatario.");

        public Task<ResponseWrapper<VehCatArrendatarioDto>> EditarAsync(VehCatArrendatarioEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatArrendatarioApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatArrendatario.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatArrendatarioApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatArrendatario.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatArrendatario.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatArrendatario.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
