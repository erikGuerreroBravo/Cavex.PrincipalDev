using Cavex.Principal.ApiClients.Sucursales;
using Cavex.Principal.Common;
using Cavex.Principal.Models.CatSucursal;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class SucursalesService : ISucursalesService
    {
        private readonly ISucursalesApi _sucursalesApi;
        private readonly ILogger<SucursalesService> _logger;

        public SucursalesService(ISucursalesApi sucursalesApi, ILogger<SucursalesService> logger)
        {
            _sucursalesApi = sucursalesApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<CatSucursalDto>>> ObtenerTodosAsync(CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _sucursalesApi.GetAllAsync(cancellationToken), "No fue posible obtener las sucursales.");

        public Task<ResponseWrapper<CatSucursalDto>> CrearAsync(CatSucursalSaveDto request, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _sucursalesApi.CreateAsync(RequestWrapper<CatSucursalSaveDto>.Create(request), cancellationToken), "No fue posible crear la sucursal.");

        public Task<ResponseWrapper<CatSucursalDto>> ActualizarAsync(int id, CatSucursalSaveDto request, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _sucursalesApi.UpdateAsync(id, RequestWrapper<CatSucursalSaveDto>.Create(request), cancellationToken), "No fue posible actualizar la sucursal.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _sucursalesApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar la sucursal.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming Sucursales.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming Sucursales.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}