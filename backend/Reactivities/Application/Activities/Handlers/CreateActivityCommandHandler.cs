using Application.Activities.Contracts;
using Application.Activities.Repositories;
using AutoMapper;
using Domain;

namespace Application.Activities.Handlers;

public class CreateActivityCommandHandler : MediatR.IRequestHandler<Application.Activities.Commands.CreateActivityCommand, ActivityDto>
{
    private readonly IActivityRepository _repository;
    private readonly IMapper _mapper;

    public CreateActivityCommandHandler(IActivityRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ActivityDto> Handle(Application.Activities.Commands.CreateActivityCommand request, CancellationToken cancellationToken)
    {
        // Create new domain entity from DTO input.
        var entity = _mapper.Map<Activity>(request.Activity);
        await _repository.AddAsync(entity, cancellationToken);
        return _mapper.Map<ActivityDto>(entity);
    }
}

