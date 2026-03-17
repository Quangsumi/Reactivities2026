using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Data;

var builder = WebApplication.CreateBuilder(args);

// Force authentication for all API controllers by default. 
// Use [AllowAnonymous] on specific actions to bypass this.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddOpenApi();
builder.Services.AddCors();

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// for SPA (React, Vue, ...) while AddDefaultIdentity for server side render (MVC/Blazor)
builder.Services.AddIdentityApiEndpoints<User>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
    }).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(opt => opt.AllowAnyHeader()
.AllowAnyMethod()
.AllowCredentials() // instruct browser to allow send/receive cookie from the below origins 
.WithOrigins("http://localhost:3000", "https://localhost:3000"));

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// All default routes will now be /api/login, /api/register, etc.
// This will work along side with AccountsController /api/accounts/register, ...
app.MapGroup("api").MapIdentityApi<User>();

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
