using Cavex.Principal.ApiClients.VehCatMarcaVehiculo;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatMarcaVehiculoService : IVehCatMarcaVehiculoService
    {
        private readonly IVehCatMarcaVehiculoApi _vehCatMarcaVehiculoApi;
        private readonly ILogger<VehCatMarcaVehiculoService> _logger;

        public VehCatMarcaVehiculoService(IVehCatMarcaVehiculoApi vehCatMarcaVehiculoApi, ILogger<VehCatMarcaVehiculoService> logger)
        {
            _vehCatMarcaVehiculoApi = vehCatMarcaVehiculoApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatMarcaVehiculoDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            string? search = null,
            CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaVehiculoApi.GetAllAsync(pageIndex, pageSize, search, cancellationToken), "No fue posible obtener los registros de VehCatMarcaVehiculo.");

        public async Task<bool> ExistePorNombreAsync(string nombre, int? excludeId = null, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(nombre)) return false;
            var response = await ObtenerTodosAsync(1, 10, nombre, cancellationToken);
            if (response.Success && response.Data?.Items != null)
            {
                return response.Data.Items.Any(x => 
                    x.StrValor.Trim().Equals(nombre.Trim(), StringComparison.OrdinalIgnoreCase) 
                    && (!excludeId.HasValue || x.Id != excludeId.Value));
            }
            return false;
        }

        public Task<ResponseWrapper<VehCatMarcaVehiculoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaVehiculoApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatMarcaVehiculo.");

        public Task<ResponseWrapper<VehCatMarcaVehiculoDto>> CrearAsync(VehCatMarcaVehiculoSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaVehiculoApi.CreateAsync(RequestWrapper<VehCatMarcaVehiculoSaveDto>.Create(dto), cancellationToken), "No fue posible crear el registro de VehCatMarcaVehiculo.");

        public Task<ResponseWrapper<VehCatMarcaVehiculoDto>> EditarAsync(VehCatMarcaVehiculoEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaVehiculoApi.UpdateAsync(dto.Id, RequestWrapper<VehCatMarcaVehiculoEditDto>.Create(dto), cancellationToken), "No fue posible editar el registro de VehCatMarcaVehiculo.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatMarcaVehiculoApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatMarcaVehiculo.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatMarcaVehiculo.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatMarcaVehiculo.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }
    }
}
