using Application.Common.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Infrastructure;

public class IsHostRequirement : IAuthorizationRequirement
{
}

public class IsHostRequirementHandler(IApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        var activityId = httpContext?.GetRouteValue("id") as string;
        if (string.IsNullOrEmpty(activityId)) return;

        var activityDetails = await dbContext.Activities
            .Include(a => a.Attendees)
            .FirstOrDefaultAsync(a => a.Id == activityId);

        if (activityDetails == null) return;

        var isHost = activityDetails?.Attendees.Any(a => a.UserId == userId && a.IsHost) ?? false;
        
        if (isHost) context.Succeed(requirement);
    }
}
