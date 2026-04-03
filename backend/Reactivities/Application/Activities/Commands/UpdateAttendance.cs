using Application.Common.Repositories;
using Application.Common.Services;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<bool>
    {
        public required string ActivityId { get; set; }
    }

    public class Handler(IUnitOfWork unitOfWork, IApplicationDbContext dbContext, IUserService userService): IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            // TODO: Implement Result Pattern instead of throwing exceptions in application layer

            var activity = await dbContext.Activities.FirstOrDefaultAsync(a => a.Id == request.ActivityId, cancellationToken: cancellationToken)
                ?? throw new Exception("Activity not found");

            var user = await userService.GetCurrentUserAsync(includePhotos: false, cancellationToken)
                ?? throw new Exception("User not found");

            var attendance = activity.Attendees.FirstOrDefault(a => a.UserId == user.Id);
            var isHost = activity.Attendees.Any(a => a.UserId == user.Id && a.IsHost);

            if (attendance != null)
            {
                if (isHost) activity.IsCancelled = !activity.IsCancelled;
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

            return await unitOfWork.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}


