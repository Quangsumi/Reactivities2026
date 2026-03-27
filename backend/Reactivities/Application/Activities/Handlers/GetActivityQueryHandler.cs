using Application.Activities.Contracts;
using Application.Activities.Repositories;
using AutoMapper;
using Domain;

namespace Application.Activities.Handlers;

public class GetActivityQueryHandler : MediatR.IRequestHandler<Application.Activities.Queries.GetActivityQuery, ActivityDto?>
{
    private readonly IActivityRepository _repository;
    private readonly IMapper _mapper;

    public GetActivityQueryHandler(IActivityRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ActivityDto?> Handle(Application.Activities.Queries.GetActivityQuery request, CancellationToken cancellationToken)
    {
        var entity = await _repository.GetByIdAsync(request.Id, cancellationToken);
        return entity is null ? null : _mapper.Map<ActivityDto>(entity);
    }
}

