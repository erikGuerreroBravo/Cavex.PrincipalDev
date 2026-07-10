using Cavex.Principal.Common;
using Cavex.Principal.Models.ServicioAClientes;
namespace Cavex.Principal.Services.Interfaces
{
    public interface IServicioAClientesService
    {
        Task<ResponseWrapper<PagedResponse<CatServicioSaveDto>>> ObtenerTodosAsync(
            int pageIndex = 1,
            int pageSize = 10,
            string? search = null,
            int? status = null,
            CancellationToken cancellationToken = default);

        Task<bool> ExistePorNombreAsync(string nombre, int? excludeId = null, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<CatServicioSaveDto>> ObtenerPorIdAsync(int id, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<CatServicioSaveDto>> CrearAsync(CatServicioSaveDto request, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<CatServicioSaveDto>> ActualizarAsync(int id, CatServicioSaveDto request, CancellationToken cancellationToken = default);

        Task<ResponseWrapper<bool>> EliminarAsync(int id, CancellationToken cancellationToken = default);
    }
}
