using Application.Activities.Dtos;
using Application.Common.Repositories;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<ActivityDto?>
    {
        public ActivityDto Activity { get; set; } = default!;
    }

    public class Handler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<Command, ActivityDto?>
    {
        public async Task<ActivityDto?> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.Activity);
            var updated = await unitOfWork.Activities.UpdateAsync(activity, cancellationToken);
            if (updated is null) return null;

            await unitOfWork.SaveChangesAsync(cancellationToken);
            return mapper.Map<ActivityDto>(updated);
        }
    }
}
