
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Cavex.Principal.Data;

var builder = WebApplication.CreateBuilder(args);

// Configuración para carga pesada de archivos (100 MB)
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 104857600; 
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; 
});

builder.Services.AddDbContext<CavexPrincipalContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CavexPrincipalContext") ?? throw new InvalidOperationException("Connection string 'CavexPrincipalContext' not found.")));

using Cavex.Principal.Data;
using Cavex.Principal.Infraesctructure.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiSettings>(
    builder.Configuration.GetSection("ApiSettings"));

//builder.Services.AddDbContext<CavexPrincipalContext>(options =>
// options.UseSqlServer(builder.Configuration.GetConnectionString("CavexPrincipalContext") ?? throw new InvalidOperationException("Connection string 'CavexPrincipalContext' not found.")));


// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddRazorOptions(options =>
    {
        options.ViewLocationFormats.Add("/Views/Shared/UI/{0}.cshtml");
        options.ViewLocationFormats.Add("/Views/Shared/Cotizaciones/{0}.cshtml");
        options.ViewLocationFormats.Add("/Views/Shared/Sucursales/{0}.cshtml");
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");     
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}");


app.Run();
