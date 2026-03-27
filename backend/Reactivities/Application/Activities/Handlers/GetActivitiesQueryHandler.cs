using Application.Activities.Contracts;
using Application.Activities.Repositories;
using AutoMapper;
using Domain;

namespace Application.Activities.Handlers;

public class GetActivitiesQueryHandler : MediatR.IRequestHandler<Application.Activities.Queries.GetActivitiesQuery, List<ActivityDto>>
{
    private readonly IActivityRepository _repository;
    private readonly IMapper _mapper;

    public GetActivitiesQueryHandler(IActivityRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<List<ActivityDto>> Handle(Application.Activities.Queries.GetActivitiesQuery request, CancellationToken cancellationToken)
    {
        List<Activity> entities = await _repository.ListAsync(cancellationToken);
        return _mapper.Map<List<ActivityDto>>(entities);
    }
}

