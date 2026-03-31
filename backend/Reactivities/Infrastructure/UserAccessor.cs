using Application.Common.Interfaces;
using Application.Users.Repositories;
using Domain;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository) : IUserAccessor
{
    public async Task<User> GetCurrentUserAsync(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedAccessException("No user is logged in");
        }

        var user = await userRepository.GetUserById(userId, cancellationToken)
            ?? throw new UnauthorizedAccessException("Cannot find user in the DB");

        return user;
    }

    public string GetUserId()
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

        return userId == null ? throw new Exception("No user found") : userId;
    }
}
