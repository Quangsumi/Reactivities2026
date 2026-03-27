using Application.Activities.Contracts;
using Application.Activities.Repositories;
using AutoMapper;
using Domain;

namespace Application.Activities.Handlers;

public class UpdateActivityCommandHandler : MediatR.IRequestHandler<Application.Activities.Commands.UpdateActivityCommand, ActivityDto?>
{
    private readonly IActivityRepository _repository;
    private readonly IMapper _mapper;

    public UpdateActivityCommandHandler(IActivityRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ActivityDto?> Handle(Application.Activities.Commands.UpdateActivityCommand request, CancellationToken cancellationToken)
    {
        // Map DTO to entity with updated fields, then ask repository to persist.
        var entity = _mapper.Map<Activity>(request.Activity);
        var updated = await _repository.UpdateAsync(entity, cancellationToken);
        return updated is null ? null : _mapper.Map<ActivityDto>(updated);
    }
}

