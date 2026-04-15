using Application.Activities.Dtos;
using Application.Common.Repositories;
using Application.Common.Services;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<ActivityDto>
    {
        public ActivityDto Activity { get; set; } = default!;
    }

    public class Handler(IUnitOfWork unitOfWork, IUserService userService, IMapper mapper) : IRequestHandler<Command, ActivityDto>
    {
        public async Task<ActivityDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var currentUser = await userService.GetCurrentUserAsync(includePhotos: false, cancellationToken);

            var activity = mapper.Map<Activity>(request.Activity);

            activity.Attendees.Add(new ActivityAttendee
            {
                ActivityId = activity.Id,
                UserId = currentUser.Id,
                IsHost = true
            });

            await unitOfWork.Activities.AddAsync(activity, cancellationToken);
            await unitOfWork.SaveChangesAsync(cancellationToken);
            return mapper.Map<ActivityDto>(activity);
        }
    }
}