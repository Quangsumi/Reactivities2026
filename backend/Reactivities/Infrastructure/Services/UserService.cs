using Application.Common.Repositories;
using Application.Common.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Infrastructure.Services;

public class UserService(IHttpContextAccessor httpContextAccessor, IApplicationDbContext dbContext) : IUserService
{
    public async Task<User> GetCurrentUserAsync(bool includePhotos, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("No user is logged in");
        }

        User? user;

        if (includePhotos)
        {
            user = await dbContext.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == userId, cancellationToken: cancellationToken);
        }
        else
        {
            user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken: cancellationToken);
        }

        if (user == null)
        {
            throw new UnauthorizedAccessException("Cannot find user in the DB");
        }

        return user;
    }

    public string GetUserId()
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

        return userId == null ? throw new Exception("No user found") : userId;
    }
}
