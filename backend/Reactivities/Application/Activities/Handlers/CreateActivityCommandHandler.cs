using Application.Activities.Contracts;
using Application.Activities.Repositories;
using Application.Activities.Commands;
using AutoMapper;
using MediatR;
using Domain;
using Application.Common.Interfaces;

namespace Application.Activities.Handlers;

public class CreateActivityCommandHandler(IActivityRepository repository
    , IUserAccessor userAccessor
    , IMapper mapper) : IRequestHandler<CreateActivityCommand, ActivityDto>
{
    public async Task<ActivityDto> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        var currentUser = await userAccessor.GetCurrentUserAsync(cancellationToken);

        var activity = mapper.Map<Activity>(request.Activity);

        activity.Attendees.Add(new ActivityAttendee
        {
            ActivityId = activity.Id,
            UserId = currentUser.Id,
            IsHost = true
        });

        await repository.AddAsync(activity, cancellationToken);
        return mapper.Map<ActivityDto>(activity);
    }
}

