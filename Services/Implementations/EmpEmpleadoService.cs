using Cavex.Principal.ApiClients.EmpEmpleado;
using Cavex.Principal.Common;
using Cavex.Principal.Models.EmpEmpleado;
using Cavex.Principal.Services.Interfaces;
using Refit;
using System.Net;

namespace Cavex.Principal.Services.Implementations
{
    
        public class EmpEmpleadoService : IEmpEmpleadoService
        {
            private readonly IEmpEmpleadoApi _empEmpleadoApi;
            private readonly ILogger<EmpEmpleadoService> _logger;

            public EmpEmpleadoService(
                IEmpEmpleadoApi empEmpleadoApi,
                ILogger<EmpEmpleadoService> logger)
            {
                _empEmpleadoApi = empEmpleadoApi;
                _logger = logger;
            }

            public async Task<ResponseWrapper<PagedResponse<EmpEmpleadoDto>>> ObtenerTodosAsync(
                int pageIndex = 1,
                int pageSize = 10,
                CancellationToken cancellationToken = default)
            {
                return await ExecuteAsync(
                    () => _empEmpleadoApi.GetAllAsync(pageIndex, pageSize, cancellationToken),
                    "No fue posible obtener los empleados.");
            }

            public async Task<ResponseWrapper<EmpEmpleadoDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default)
            {
                return await ExecuteAsync(
                    () => _empEmpleadoApi.GetByIdAsync(id, cancellationToken),
                    "No fue posible obtener el empleado solicitado.");
            }

            public async Task<ResponseWrapper<EmpEmpleadoDto>> CrearAsync(
                EmpEmpleadoSaveDto request,
                CancellationToken cancellationToken = default)
            {
                return await ExecuteAsync(
                    () => _empEmpleadoApi.CreateAsync(RequestWrapper<EmpEmpleadoSaveDto>.Create(request), cancellationToken),
                    "No fue posible crear el empleado.");
            }

            public async Task<ResponseWrapper<EmpEmpleadoDto>> ActualizarAsync(
                int id,
                EmpEmpleadoSaveDto request,
                CancellationToken cancellationToken = default)
            {
                return await ExecuteAsync(
                    () => _empEmpleadoApi.UpdateAsync(id, RequestWrapper<EmpEmpleadoSaveDto>.Create(request), cancellationToken),
                    "No fue posible actualizar el empleado.");
            }

            public async Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default)
            {
                return await ExecuteAsync(
                    () => _empEmpleadoApi.DeleteAsync(id, cancellationToken),
                    "No fue posible eliminar el empleado.");
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
                    _logger.LogError(exception, "API error while consuming EmpEmpleado. StatusCode: {StatusCode}", exception.StatusCode);

                    return new ResponseWrapper<T>
                    {
                        StatusCode = exception.StatusCode,
                        Message = !string.IsNullOrWhiteSpace(exception.Content) ? exception.Content : fallbackMessage
                    };
                }
                catch (OperationCanceledException exception)
                {
                    _logger.LogError(exception, "Timeout while consuming EmpEmpleado.");

                    return new ResponseWrapper<T>
                    {
                        StatusCode = HttpStatusCode.GatewayTimeout,
                        Message = fallbackMessage
                    };
                }
                catch (Exception exception)
                {
                    _logger.LogError(exception, "Unexpected error while consuming EmpEmpleado.");

                    return new ResponseWrapper<T>
                    {
                        StatusCode = HttpStatusCode.InternalServerError,
                        Message = fallbackMessage
                    };
                }
            }
        }
    }


