namespace Cavex.Principal.Infraesctructure.Http
{
    public interface IApiClient
    {
        Task<T?> GetAsync<T>(string endpoint);

        Task<T?> PostAsync<T>(
            string endpoint,
            object request);

        Task<T?> PutAsync<T>(
            string endpoint,
            object request);

        Task DeleteAsync(string endpoint);
    }
}
