using FoodCooldown.DependencyInjection;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDependenciasFoodCooldown(builder.Configuration);

// Add services to the container.
builder.Services.AddControllers();
// Adiciona o servi�o de armazenamento

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentCorsPolicy", policy =>
    {
        // adicionando liberacao de CORS, para permitir que o frontend acesse a API em dev
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
        c.RoutePrefix = "swagger"; // Isso garante que ele responda em /swagger
    });
    app.UseCors("DevelopmentCorsPolicy");
    app.UseHttpsRedirection();
}


app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();

