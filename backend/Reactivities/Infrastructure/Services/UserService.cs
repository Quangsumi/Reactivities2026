using Application.Common.Repositories;
using Application.Common.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Services;

public class UserService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork) : IUserService
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
            user = await unitOfWork.Users.GetUserWithPhotos(userId, cancellationToken);
        }
        else
        {
            user = await unitOfWork.Users.GetUser(userId, cancellationToken);
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
