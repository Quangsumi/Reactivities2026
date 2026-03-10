using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors();

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000"));

//app.UseHttpsRedirection();
//app.UseAuthorization();

app.MapControllers();

try
{
    await DbInitializer.PrepDb(app);
}
catch (Exception)
{
    Console.WriteLine("-----> Excpetion while seeding data");
	throw;
}

app.Run();
