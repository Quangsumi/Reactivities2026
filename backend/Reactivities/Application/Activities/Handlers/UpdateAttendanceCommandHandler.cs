using Application.Activities.Commands;
using Application.Activities.Repositories;
using Application.Common.Interfaces;
using Domain;
using MediatR;

namespace Application.Activities.Handlers;

public class UpdateAttendanceCommandHandler(IActivityRepository activityRepository
    , IUserAccessor userAccessor) 
    : IRequestHandler<Commands.UpdateAttendanceCommand, bool>
{
    public async Task<bool> Handle(UpdateAttendanceCommand request, CancellationToken cancellationToken)
    {
        // TODO: Implement Result Pattern instead of throwing exceptions in application layer

        var activity = await activityRepository.GetByIdAsync(request.ActivityId, cancellationToken)
            ?? throw new Exception("Activity not found");

        var user = await userAccessor.GetCurrentUserAsync(cancellationToken) 
            ?? throw new Exception("User not found");

        var attendance = activity.Attendees.FirstOrDefault(a => a.UserId == user.Id);
        var isHost = activity.Attendees.Any(a => a.UserId == user.Id && a.IsHost);

        if (attendance != null)
        { 
            if(isHost) activity.IsCancelled = !activity.IsCancelled;
            else activity.Attendees.Remove(attendance);
        }
        else
        {
            activity.Attendees.Add(new ActivityAttendee
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = false
            });
        }

        var result = await activityRepository.SaveChangeAsync(cancellationToken);

        return result;
    }
}