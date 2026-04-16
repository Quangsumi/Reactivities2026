using Api.SignalR;
using Application.Activities.Commands;
using Application.Activities.Validators;
using Application.Common.Behaviors;
using Application.Common.Mapping;
using Application.Common.Repositories;
using Application.Common.Services;
using Domain;
using FluentValidation;
using Infrastructure;
using Infrastructure.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;

    options.Cookie.SameSite = SameSiteMode.None; // default is Lax (cookies are treated as Same-Site only by browser, cookie will not be sticked)
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Required for 'None'

    // Optional: If you want the cookie to last after browser close
    options.ExpireTimeSpan = TimeSpan.FromDays(7);
    options.SlidingExpiration = true; // keep user logged in indefinitely as long as they use the app
});

builder.Services.AddSignalR();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

// for SPA (React, Vue, ...) while AddDefaultIdentity for server side render (MVC/Blazor)
builder.Services.AddIdentityApiEndpoints<User>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
    }).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

// Clean Architecture wiring (CQRS via MediatR + FluentValidation).
builder.Services.AddMediatR(typeof(CreateActivity).Assembly);
builder.Services.AddAutoMapper(typeof(ActivityProfile));
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityCommandValidator>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<AppDbContext>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Global exception handler for API errors
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        var exception = exceptionHandlerPathFeature?.Error;

        if (exception is ValidationException validationException)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/json";

            var errors = validationException.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray()
                );

            var details = new ValidationProblemDetails(errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "One or more validation errors occurred."
            };

            await context.Response.WriteAsJsonAsync(details);
            return;
        }

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(new { error = exception?.Message });
    });
});

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

app.MapHub<CommentHub>("/comments");

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
