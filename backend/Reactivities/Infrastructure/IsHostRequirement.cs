using Application.Activities.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Security.Claims;

namespace Infrastructure;

public class IsHostRequirement : IAuthorizationRequirement
{
}

public class IsHostRequirementHandler(IActivityRepository activityRepository, 
    IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        var activityId = httpContext?.GetRouteValue("id") as string;
        if (string.IsNullOrEmpty(activityId)) return;

        var activityDetails = await activityRepository.GetByIdAsync(activityId, CancellationToken.None);
        if (activityDetails == null) return;

        var isHost = activityDetails?.Attendees.Any(a => a.UserId == userId && a.IsHost) ?? false;
        if (isHost) context.Succeed(requirement);
    }
}
