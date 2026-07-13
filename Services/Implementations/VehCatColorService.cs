using Cavex.Principal.ApiClients.VehCatColor;
using Cavex.Principal.ApiClients.VehCatMarcaVehiculo;
using Cavex.Principal.Common;
using Cavex.Principal.Models.VehCatColor;
using Cavex.Principal.Models.VehCatMarcaVehiculo;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class VehCatColorService : IVehCatColorService
    {
        private readonly IVehCatColorApi _vehCatColorApi;
        private readonly ILogger<VehCatColorService> _logger;

        public VehCatColorService(IVehCatColorApi vehCatColorApi, ILogger<VehCatColorService> logger)
        {
            _vehCatColorApi = vehCatColorApi;
            _logger = logger;
        }

        public Task<ResponseWrapper<PagedResponse<VehCatColorDto>>> ObtenerTodosAsync(
           int pageIndex = 1,
           int pageSize = 10,
           string? search = null,
           CancellationToken cancellationToken = default) =>
           ExecuteAsync(() => _vehCatColorApi.GetAllAsync(pageIndex, pageSize, search, cancellationToken), "No fue posible obtener los registros de VehCatColor.");


        public Task<ResponseWrapper<VehCatColorDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatColorApi.GetByIdAsync(id, cancellationToken), "No fue posible obtener el registro de VehCatColor.");

        public Task<ResponseWrapper<VehCatColorDto>> CrearAsync(VehCatColorSaveDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatColorApi.CreateAsync(dto, cancellationToken), "No fue posible crear el registro de VehCatColor.");

        public Task<ResponseWrapper<VehCatColorDto>> EditarAsync(VehCatColorEditDto dto, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatColorApi.UpdateAsync(dto, cancellationToken), "No fue posible editar el registro de VehCatColor.");

        public Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default) =>
            ExecuteAsync(() => _vehCatColorApi.DeleteAsync(id, cancellationToken), "No fue posible eliminar el registro de VehCatColor.");

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(Func<Task<ResponseWrapper<T>>> apiCall, string fallbackMessage)
        {
            try
            {
                var response = await apiCall();
                return response.Success ? response : ResponseWrapper<T>.Fail(response.Message ?? fallbackMessage, response.StatusCode);
            }
            catch (ApiException ex)
            {
                _logger.LogError(ex, "API error while consuming VehCatColor.");
                return ResponseWrapper<T>.Fail(!string.IsNullOrWhiteSpace(ex.Content) ? ex.Content : fallbackMessage, ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while consuming VehCatColor.");
                return ResponseWrapper<T>.Fail(fallbackMessage, HttpStatusCode.InternalServerError);
            }
        }

       



      



    }
}
