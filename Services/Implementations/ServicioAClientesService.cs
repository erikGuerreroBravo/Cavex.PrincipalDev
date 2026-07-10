using Cavex.Principal.ApiClients.ServicioAClientes;
using Cavex.Principal.Common;
using Cavex.Principal.Models.ServicioAClientes;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class ServicioAClientesService : IServicioAClientesService
    {
        private readonly IServicioAClientesApi _servicioAClientesApi;
        private readonly ILogger<ServicioAClientesService> _logger;

        public ServicioAClientesService(
            IServicioAClientesApi servicioAClientesApi,
            ILogger<ServicioAClientesService> logger)
        {
            _servicioAClientesApi = servicioAClientesApi;
            _logger = logger;
        }

        public async Task<ResponseWrapper<PagedResponse<CatServicioSaveDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            string? search = null,
            int? status = null,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _servicioAClientesApi.GetAllAsync(pageIndex, pageSize, search, status, cancellationToken),
                "No fue posible obtener los servicios a clientes.");
        }

        public async Task<bool> ExistePorNombreAsync(string nombre, int? excludeId = null, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(nombre)) return false;
            var response = await ObtenerTodosAsync(1, 10, nombre, null, cancellationToken);
            if (response.Success && response.Data?.Items != null)
            {
                return response.Data.Items.Any(x => 
                    x.StrValor.Trim().Equals(nombre.Trim(), StringComparison.OrdinalIgnoreCase) 
                    && (!excludeId.HasValue || x.Id != excludeId.Value));
            }
            return false;
        }

        public async Task<ResponseWrapper<CatServicioSaveDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _servicioAClientesApi.GetByIdAsync(id, cancellationToken),
                "No fue posible obtener el servicio a cliente solicitado.");
        }

        public async Task<ResponseWrapper<CatServicioSaveDto>> CrearAsync(
            CatServicioSaveDto request,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _servicioAClientesApi.CreateAsync(RequestWrapper<CatServicioSaveDto>.Create(request), cancellationToken),
                "No fue posible crear el servicio a cliente.");
        }

        public async Task<ResponseWrapper<CatServicioSaveDto>> ActualizarAsync(
            int id,
            CatServicioSaveDto request,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _servicioAClientesApi.UpdateAsync(id, RequestWrapper<CatServicioSaveDto>.Create(request), cancellationToken),
                "No fue posible actualizar el servicio a cliente.");
        }

        public async Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _servicioAClientesApi.DeleteAsync(id, cancellationToken),
                "No fue posible eliminar el servicio a cliente.");
        }

        private async Task<ResponseWrapper<T>> ExecuteAsync<T>(
            Func<Task<ResponseWrapper<T>>> apiCall,
            string fallbackMessage)
        {
            try
            {
                var response = await apiCall();

                return response.Success
                    ? response
                    : new ResponseWrapper<T>
                    {
                        StatusCode = response.StatusCode,
                        Message = string.IsNullOrWhiteSpace(response.Message) ? fallbackMessage : response.Message,
                        Data = response.Data
                    };
            }
            catch (ApiException exception)
            {
                _logger.LogError(exception, "API error while consuming ServicioAClientes. StatusCode: {StatusCode}", exception.StatusCode);

                return new ResponseWrapper<T>
                {
                    StatusCode = exception.StatusCode,
                    Message = !string.IsNullOrWhiteSpace(exception.Content) ? exception.Content : fallbackMessage
                };
            }
            catch (OperationCanceledException exception)
            {
                _logger.LogError(exception, "Timeout while consuming ServicioAClientes.");

                return new ResponseWrapper<T>
                {
                    StatusCode = HttpStatusCode.GatewayTimeout,
                    Message = fallbackMessage
                };
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unexpected error while consuming ServicioAClientes.");

                return new ResponseWrapper<T>
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = fallbackMessage
                };
            }
        }
    }
}
