using FoodCooldown.DependencyInjection;

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Minha API v1");
        c.RoutePrefix = "swagger"; // Isso garante que ele responda em /swagger
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

