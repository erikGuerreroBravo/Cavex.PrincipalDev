using Cavex.Principal.ApiClients.EmpCatAreaLaboral;
using Cavex.Principal.ApiClients.EmpEmpleado;
using Cavex.Principal.ApiClients.ServicioAClientes;
using Cavex.Principal.ApiClients.Sucursales;
using Cavex.Principal.Infrastructure.Policies;
using Cavex.Principal.Infrastructure.Settings;
using Cavex.Principal.Services.Implementations;
using Cavex.Principal.Services.Interfaces;
using Microsoft.Extensions.Options;
using Refit;
using System.Text.Json;


namespace Cavex.Principal.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IServicioAClientesService, ServicioAClientesService>();
            services.AddScoped<IEmpCatAreaLaboralService, EmpCatAreaLaboralService>();
            services.AddScoped<IEmpEmpleadoService, EmpEmpleadoService>();

            return services;
        }

        public static IServiceCollection AddApiClients(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<ApiSettings>()
                .Bind(configuration.GetSection(ApiSettings.SectionName))
                .Validate(settings => !string.IsNullOrWhiteSpace(settings.BaseUrl), "ApiSettings:BaseUrl is required.")
                .Validate(settings => Uri.TryCreate(settings.BaseUrl, UriKind.Absolute, out _), "ApiSettings:BaseUrl must be an absolute URL.")
                .ValidateOnStart();

            var refitSettings = new RefitSettings
            {
                ContentSerializer = new SystemTextJsonContentSerializer(new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                })
            };

            services.AddRefitClient<IServicioAClientesApi>(refitSettings)
                .ConfigureHttpClient((sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<ApiSettings>>().Value;
                    client.BaseAddress = new Uri(settings.BaseUrl);
                    client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
                })
                .AddPolicyHandler(PollyPolicies.RetryPolicy())
                .AddPolicyHandler(PollyPolicies.TimeoutPolicy())
                .AddPolicyHandler(PollyPolicies.CircuitBreakerPolicy());

            services.AddRefitClient<IEmpCatAreaLaboralApi>(refitSettings)
                .ConfigureHttpClient((sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<ApiSettings>>().Value;
                    client.BaseAddress = new Uri(settings.BaseUrl);
                    client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
                })
                .AddPolicyHandler(PollyPolicies.RetryPolicy())
                .AddPolicyHandler(PollyPolicies.TimeoutPolicy())
                .AddPolicyHandler(PollyPolicies.CircuitBreakerPolicy());

            services.AddRefitClient<ISucursalesApi>(refitSettings)
                .ConfigureHttpClient((sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<ApiSettings>>().Value;
                    client.BaseAddress = new Uri(settings.BaseUrl);
                    client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
                })
                .AddPolicyHandler(PollyPolicies.RetryPolicy())
                .AddPolicyHandler(PollyPolicies.TimeoutPolicy())
                .AddPolicyHandler(PollyPolicies.CircuitBreakerPolicy());

            services.AddRefitClient<ICatStatusApi>(refitSettings)
                .ConfigureHttpClient((sp, client) =>
                {
                    var settings = sp.GetRequiredService<IOptions<ApiSettings>>().Value;
                    client.BaseAddress = new Uri(settings.BaseUrl);
                    client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
                })
                .AddPolicyHandler(PollyPolicies.RetryPolicy())
                .AddPolicyHandler(PollyPolicies.TimeoutPolicy())
                .AddPolicyHandler(PollyPolicies.CircuitBreakerPolicy());
            services
                .AddRefitClient<IEmpEmpleadoApi>(refitSettings)
                .ConfigureHttpClient((sp, client) =>
                {
                   var settings = sp.GetRequiredService<IOptions<ApiSettings>>().Value;
                   client.BaseAddress = new Uri(settings.BaseUrl);
                   client.Timeout = TimeSpan.FromSeconds(settings.TimeoutSeconds);
                })
                .AddPolicyHandler(PollyPolicies.RetryPolicy())
                .AddPolicyHandler(PollyPolicies.TimeoutPolicy())
                .AddPolicyHandler(PollyPolicies.CircuitBreakerPolicy());

            return services;
        }
    }
}
