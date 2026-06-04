using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Cavex.Principal.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CavexPrincipalContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CavexPrincipalContext") ?? throw new InvalidOperationException("Connection string 'CavexPrincipalContext' not found.")));

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
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
