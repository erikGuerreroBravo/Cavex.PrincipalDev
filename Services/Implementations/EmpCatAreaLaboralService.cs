using Cavex.Principal.ApiClients.EmpCatAreaLaboral;
using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpCatAreaLaboral;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    public class EmpCatAreaLaboralService : IEmpCatAreaLaboralService
    {
        private readonly IEmpCatAreaLaboralApi _api;
        private readonly ILogger<EmpCatAreaLaboralService> _logger;

        public EmpCatAreaLaboralService(
            IEmpCatAreaLaboralApi api,
            ILogger<EmpCatAreaLaboralService> logger)
        {
            _api = api;
            _logger = logger;
        }

        public async Task<ResponseWrapper<PagedResponse<EmpCatAreaLaboralDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            string? search = null,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _api.GetAllAsync(pageIndex, pageSize, search, cancellationToken),
                "No fue posible obtener las areas laborales.");
        }

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

        public async Task<ResponseWrapper<EmpCatAreaLaboralDto>> ObtenerPorIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _api.GetByIdAsync(id, RequestWrapper<int>.Create(id), cancellationToken),
                "No fue posible obtener el area laboral solicitada.");
        }

        public async Task<ResponseWrapper<EmpCatAreaLaboralDto>> CrearAsync(
            EmpCatAreaLaboralSaveDto request,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _api.CreateAsync(RequestWrapper<EmpCatAreaLaboralSaveDto>.Create(request), cancellationToken),
                "No fue posible crear el area laboral.");
        }

        public async Task<ResponseWrapper<EmpCatAreaLaboralDto>> ActualizarAsync(
            int id,
            EmpCatAreaLaboralSaveDto request,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _api.UpdateAsync(id, RequestWrapper<EmpCatAreaLaboralSaveDto>.Create(request), cancellationToken),
                "No fue posible actualizar el area laboral.");
        }

        public async Task<ResponseWrapper<bool>> EliminarAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            return await ExecuteAsync(
                () => _api.DeleteAsync(id, RequestWrapper<int>.Create(id), cancellationToken),
                "No fue posible eliminar el area laboral.");
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
                _logger.LogError(exception, "API error while consuming EmpCatAreaLaboral. StatusCode: {StatusCode}", exception.StatusCode);

                return new ResponseWrapper<T>
                {
                    StatusCode = exception.StatusCode,
                    Message = !string.IsNullOrWhiteSpace(exception.Content) ? exception.Content : fallbackMessage
                };
            }
            catch (OperationCanceledException exception)
            {
                _logger.LogError(exception, "Timeout while consuming EmpCatAreaLaboral.");

                return new ResponseWrapper<T>
                {
                    StatusCode = HttpStatusCode.GatewayTimeout,
                    Message = fallbackMessage
                };
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unexpected error while consuming EmpCatAreaLaboral.");

                return new ResponseWrapper<T>
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Message = fallbackMessage
                };
            }
        }
    }
}
